import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/css/global.css"
import {Home} from "./components/home/Index";
import {Statistics} from "./components/statistics/Index";
import {List} from "./components/list/Index"
import {Form} from "./components/list//form/Index"


const Core= () => {
return(
  <div class="Container">
        <Router>
           <Switch>
              <Route exact path="/" render ={(v) => <Home{...v}/>}/>
              <Route exact path="/statistics" render ={(v) => <Statistics{...v}/>}/>
              <Route exact path="/list" render ={(v) => <List{...v}/>}/>
               <Route exact path="/list/form" render ={(v) => <Form{...v}/>}/>
           </Switch>
        </Router>
        {/* <Home/>
       <Statistics/>*/}
  </div>
 
)
}

export default Core;