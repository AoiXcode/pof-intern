import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./assets/css/global.css";
import "./assets/css/list.css";

import { Home } from "./components/home/Index";
import { Statistics } from "./components/statistics/Index";
import { List } from "./components/list/Index";
import { Form } from "./components/list/form/Index";

const Core = () => {

  const [cases] = useState([
    { id: 1, name: 'Affected' },
    { id: 2, name: 'Death' },
    { id: 3, name: 'Recovered' },
    { id: 4, name: 'Active' },
    { id: 5, name: 'Serious' },
  ]);

  // ✅ LOAD FROM LOCAL STORAGE
  const [lcases, setLcases] = useState(() => {
    const saved = localStorage.getItem("lcases");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'John Doe', case: 5, city: 'Taguig' }
    ];
  });

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("lcases", JSON.stringify(lcases));
  }, [lcases]);

  const [form, setForm] = useState({
    method: 'create',
    inputs: {
      name: { value: '' },
      case: { value: '' },
      city: { value: '' },
    }
  });

  return (
    <div className="Container">
      <Router>
        <Switch>

          <Route exact path="/" render={(v) => <Home {...v} lcases={lcases}/>} />

          <Route exact path="/statistics" render={(v) => <Statistics {...v} lcases={lcases}/>} />

          <Route
            exact
            path="/list"
            render={(v) => (
              <List
                {...v}
                lcases={lcases}
                setLcases={setLcases}
                cases={cases}
              />
            )}
          />

          {/* CREATE */}
          <Route
            exact
            path="/list/form"
            render={(v) => (
              <Form
                {...v}
                form={form}
                setForm={setForm}
                lcases={lcases}
                setLcases={setLcases}
              />
            )}
          />

          {/* UPDATE */}
          <Route
            exact
            path="/list/form/:selected"
            render={(v) => (
              <Form
                {...v}
                form={form}
                setForm={setForm}
                lcases={lcases}
                setLcases={setLcases}
              />
            )}
          />

        </Switch>
      </Router>
    </div>
  );
};

export default Core;