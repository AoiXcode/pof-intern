import { useState } from "react"
import { useHistory } from "react-router-dom"
import { Bottom } from "../navigations/Bottom"
import "../../assets/css/list.css"

export const List= ()=>{
    const history = useHistory()
    const [lcases, setlcases] = useState([{name:'john', case:'Recovered', city:'Taguig City'}])
    
    const acHandler=() =>{
        history.push('/list/form')
    }

    return (
    <div className="list-main-container">
        <div className="list-container-1">
            <button onClick={acHandler}>Add Case</button>
        </div>
        <div className="list-container-2">
            <div>
                <div>Name</div>
                <div>Case</div>
                <div>City</div>
            </div>
            <div>
                 {/* <div>
                    <div>John Doe</div>
                    <div>Recovered</div>
                    <div>Taguig</div>
                </div> */} 
                    {
                       lcases !== null? (
                        lcases.length !== 0?(
                            <div>
                                 <div>John Doe</div>
                                <div>Recovered</div>
                                <div>Taguig</div>
                            </div>
                        ) :(
                            <div>No record Found</div>
                        )
                       ) :(
                        <div>Please wait fetching records</div>
                       )
                    }
                
            </div>
        </div>
    <Bottom/>
    </div>
    )
}