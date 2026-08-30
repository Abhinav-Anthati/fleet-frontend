# Fleet Frontend

React frontend for Fleet Service, a fleet reservation and maintenance system.
Renders three genuinely different dashboards depending on role, not the same
view with buttons hidden.

Backend repo: [fleet-service](https://github.com/YourUsername/fleet-service)

## Screenshots

See the [backend README](https://github.com/YourUsername/fleet-service#screenshots)
for the full set of dashboard screenshots across all three roles.

## Tech stack

React, Vite, Axios, deployed on AWS ECS Fargate behind an Application Load
Balancer, served via nginx.

## Architecture

### Shared abstraction: EntityManagement

Vehicles, reservations, users, and maintenance windows all follow the same
underlying pattern: fetch a list, render it, optionally act on an item, and
refresh after any create or update. Rather than duplicating that fetch/render/
refresh logic four times, one shared `EntityManagement` component handles it
generically:

```jsx
<EntityManagement
  endpoint="/vehicles"
  renderItem={(v) => `${v.make} ${v.model} - ${v.status}`}
  CreateForm={CreateVehicleForm}
/>
```

`renderItem` receives both the item and a `refresh` callback, so components
with an inline action, approving a reservation, changing a user's role, can
trigger a refetch after their own API call succeeds, without `EntityManagement`
itself knowing anything about approving or role changes. This abstraction was
built after four real, near-identical components already existed, generalizing
from concrete repetition rather than guessing at the shape upfront.

### Role-based dashboard composition

`AdminDashboard` was built first, with full access to all four entities. Once
built, `ManagerDashboard` reuses the exact same `VehicleManagement`,
`ReservationManagement`, and `MaintenanceWindowManagement` components,
composing a smaller dashboard by simply omitting `UserManagement`, no
duplicated code.

`DriverDashboard` is not a stripped-down copy of the others, and deliberately
so. A driver's view of reservations is genuinely different data, availability
windows for other people's bookings with no identity exposed, full detail only
for their own reservations, not the same list with fewer buttons. This required
a real, separate `VehicleAvailability` component rather than reusing
`ReservationManagement`.

### Session handling

The app uses HTTP Basic Auth against the backend. Credentials are set once on a
shared Axios instance after login and attached automatically to every
subsequent request. This is a known, deliberate tradeoff: a production system
would use short-lived, revocable tokens (JWT) instead of holding a raw password
in memory for the session. Basic Auth was chosen here for development speed on
a project this size, and is documented as a known limitation rather than an
oversight.

## Local development

```bash
npm install
npm run dev
```

Defaults to `http://localhost:8080/api` for the backend. Requires the backend
running locally (see the backend README's Docker Compose setup) and CORS
configured to allow `http://localhost:5173`.

## Deployment

The production backend URL is baked into the build at build time via Vite's
environment variables (`VITE_API_URL`), read from `.env.production`, not
configured at runtime. This means the frontend image must be rebuilt whenever
the backend's deployed URL changes, a real tradeoff of static-site deployment
versus a runtime-configurable frontend.

Deployed on ECS Fargate, served via nginx, behind its own Application Load
Balancer, separate from the backend's. Same deliberate CI-without-auto-deploy
approach as the backend, see the [backend README](https://github.com/YourUsername/fleet-service#cicd)
for the full reasoning.

### A real bug worth documenting

Early in deployment, the login check specifically called `axios` directly with
a hardcoded `localhost:8080` URL, left over from before the shared, environment-
aware Axios instance existed. Every other component correctly used the shared
instance; this one file was missed. It surfaced as "invalid email or password"
in production, a misleading error, since the real failure was a `net::ERR_CONNECTION_REFUSED`
against `localhost` from inside a browser that had no `localhost:8080` to
connect to at all. Fixed by routing the login check through the same shared
instance as everything else.

## Cost management

Like the backend, the ECS service and load balancer for this frontend are
scaled to zero and taken down between active demos.