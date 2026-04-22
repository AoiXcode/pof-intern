export const HomeSummary = ({ lcases = [] }) => {

  const count = (id) =>
    lcases.filter((item) => item.case === id).length;

  return (
    <div className="home-summary">

      <div className="home-summary-title">
        Quick Overview
      </div>

      <div className="home-summary-grid">

        <div className="summary-card affected">
          <p>Affected</p>
          <h3>{count(1)}</h3>
        </div>

        <div className="summary-card death">
          <p>Death</p>
          <h3>{count(2)}</h3>
        </div>

        <div className="summary-card recovered">
          <p>Recovered</p>
          <h3>{count(3)}</h3>
        </div>

        <div className="summary-card active">
          <p>Active</p>
          <h3>{count(4)}</h3>
        </div>

        <div className="summary-card serious">
          <p>Serious</p>
          <h3>{count(5)}</h3>
        </div>

      </div>

    </div>
  );
};