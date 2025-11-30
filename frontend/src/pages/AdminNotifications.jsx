import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminNotifications() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const res = await api.get("admin/notifications/");
        setNotes(res.data);
      } catch (err) {
        console.log("Error loading notifications", err);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">
        Admin Notifications
      </h1>

      {notes.length === 0 ? (
        <p className="text-[var(--muted-text)] text-lg">No notifications yet.</p>
      ) : (
        <div className="flex flex-col gap-5">
          {notes.map((n) => (
            <div
              key={n.id}
              className="p-5 rounded-lg shadow-md border border-[#2A2A2A] 
              bg-[#0F1216]/90 hover:bg-[#1A1E24] transition-all duration-300"
            >
              <p className="text-lg text-[var(--warm-text)] font-medium mb-2">
                {n.message}
              </p>

              <small className="text-xs text-[var(--muted-text)]">
                {new Date(n.created_at).toLocaleString()}
              </small>

              {!n.is_read && (
                <span className="mt-2 inline-block text-xs bg-[var(--gold)] text-black px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
