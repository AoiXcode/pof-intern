import { Link } from "react-router-dom"
import house from "../../assets/images/house.svg";
import stats from "../../assets/images/stats.svg";
import add from "../../assets/icons/add.svg";
import "../../assets/css/navigations.css"


export const Bottom =()=>{
    return(
        <div className="botom-container">
            <div className="nav-bottom">
                    <div>
                         <Link to ="/"><img src={house} alt="icon" /></Link>
                    </div>
                       <Link to ="/statistics"><img src={stats} alt="icon" /></Link>
                    <div>
                         <Link to ="/list"><img src={add} alt="icon" /></Link>
                    </div>
            </div>
        </div>
    )
}