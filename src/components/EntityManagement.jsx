import { useState, useEffect } from 'react'
import api from '../api'

function EntityManagement({ endpoint, renderItem, CreateForm }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    function fetchItems() {
        api
            .get(endpoint)
            .then((response) => setItems(response.data))
            .catch((error) => console.error(`Failed to fetch from ${endpoint}:`, error));
    }

    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{renderItem(item, fetchItems)}</li>
                ))}
            </ul>
            {CreateForm && <CreateForm onCreated={fetchItems} />}
        </div>
    );
}

export default EntityManagement;