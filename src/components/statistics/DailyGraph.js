import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { ResponsiveContainer } from "recharts";

export default function DailyGraph({ lcases = [] }) {

  // 🔥 SINGLE LOOP COUNT (NO FILTERS)
  const counts = lcases.reduce(
    (acc, item) => {
      acc[item.case] = (acc[item.case] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const data = [
    { name: "Affected", value: counts[1], color: "#f4a742" },
    { name: "Death", value: counts[2], color: "#ff5e57" },
    { name: "Recovered", value: counts[3], color: "#2ecc71" },
    { name: "Active", value: counts[4], color: "#3498db" },
    { name: "Serious", value: counts[5], color: "#9b59b6" },
  ];

  return (
    <div className="graph-container">

      <h3>Case Distribution</h3>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}