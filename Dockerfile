# Stage 1: build the static files
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: serve them
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80