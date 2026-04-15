import { Bottom } from "../navigations/Bottom"
import { Top } from "../navigations/Top"
import { Banner } from "./Banner"
import { Contacts } from "./contacts/Index"
import { Prevention } from "./prevention/Index"
import "../../assets/css/home.css"


export const Home =() =>{
    return(
        <div className="home">
            <div className="home-header-1">
                 <Top/>
                 <Contacts/>
            </div>
                 <Prevention/>
                 <Banner/>
            <div className="home-footer-1">
                <Bottom/>
            </div>
          
        </div>  
    )
}