export default function Summary({ lcases = [] }) {

  // 🔥 SINGLE LOOP (FASTEST WAY)
  const counts = lcases.reduce(
    (acc, item) => {
      acc[item.case] = (acc[item.case] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  const data = [
    { id: 1, label: "Affected", className: "affected" },
    { id: 2, label: "Death", className: "death" },
    { id: 3, label: "Recovered", className: "recovered" },
    { id: 4, label: "Active", className: "active" },
    { id: 5, label: "Serious", className: "serious" },
  ];

  return (
    <div className="summary-grid">

      {data.map((item) => (
        <div key={item.id} className={`card ${item.className}`}>
          <p>{item.label}</p>
          <h3>{counts[item.id]}</h3>
        </div>
      ))}

    </div>
  );
}