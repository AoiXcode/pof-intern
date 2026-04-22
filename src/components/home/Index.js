import { Bottom } from "../navigations/Bottom"
import { Top } from "../navigations/Top"
import { Banner } from "./Banner"
import { Contacts } from "./contacts/Index"
import { HomeSummary } from "./HomeSummary";
import { HomeStats } from "./HomeStats";
import { HomeInsights } from "./HomeInsights";

import { Prevention } from "./prevention/Index"
import "../../assets/css/home.css"


export const Home =({lcases}) =>{
    return(
        <div className="home">
            <div className="home-header-1">
                 <Top/>
                 <Contacts/>
            </div>
                <HomeStats lcases={lcases} />
                <HomeInsights lcases={lcases} />
                 {/* <HomeSummary lcases={lcases} /> */}
                 <Prevention/>
                 <Banner/>
            <div className="home-footer-1">
                <Bottom/>
            </div>
          
        </div>  
    )
}