import { useEffect, useState } from "react";
import api from "../services/api";

export default function Specials() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("menu/").then(res => setItems(res.data.filter(i => i.is_special))).catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Today's Specials</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(i => (
          <div key={i.id} className="p-4 bg-white rounded shadow">
            <div className="font-bold">{i.name}</div>
            <div className="text-sm text-gray-600">{i.category_name}</div>
            <div>Rs. {i.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
