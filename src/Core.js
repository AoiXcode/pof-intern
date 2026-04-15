import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/css/global.css"
import {Home} from "./components/home/Index";
import {Statistics} from "./components/statistics/Index";
import {List} from "./components/list/Index"
import {Form} from "./components/list//form/Index"


const Core= () => {
    const [form, setForm] = useState({
    method: 'create', 
    submitted: false,
    confirmation: {
      toggled: false, 
      type: '',
    },
    inputs: {
      name: { value: '', stat: false, msg: '' },
      case: { value: 0, stat: false, msg: '' },
      city: { value: 0, stat: false, msg: '' },
    }
  });
return(
  <div class="Container">
        <Router>
           <Switch>
              <Route exact path="/" render ={(v) => <Home{...v}/>}/>
              <Route exact path="/statistics" render ={(v) => <Statistics{...v} />}/>
              <Route exact path="/list" render ={(v) => <List{...v} form={form} setForm={setForm}/>}/>
               <Route exact path="/list/form" render ={(v) => <Form{...v} form={form} setForm={setForm}/>}/>
           </Switch>
        </Router>
        {/* <Home/>
       <Statistics/>*/}
  </div>
 
)
}

export default Core;