import { useEffect, useState } from "react";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("analytics/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Page Title */}
      <h1 className="text-3xl font-serif text-[var(--gold)] mb-6">
        Category Analytics
      </h1>

      {/* Card Wrapper */}
      <div className="card p-6">
        <h2 className="text-xl text-[var(--warm-text)] mb-4 font-medium">
          Menu Distribution by Categories
        </h2>

        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              {/* Grid lines styled for dark mode */}
              <CartesianGrid stroke="#2A2622" vertical={false} />

              {/* X Axis */}
              <XAxis dataKey="category" stroke="var(--muted-text)" tick={{ fill: "var(--muted-text)" }} />

              {/* Y Axis */}
              <YAxis stroke="var(--muted-text)" tick={{ fill: "var(--muted-text)" }} />

              {/* Tooltip */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--dark-card)",
                  border: "1px solid var(--gold)",
                  borderRadius: "6px",
                  color: "var(--warm-text)",
                }}
                labelStyle={{ color: "var(--gold)" }}
              />

              {/* Bars */}
              <Bar dataKey="count" fill="var(--gold)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
