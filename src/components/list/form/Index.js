import { Bottom } from "../../navigations/Bottom"
export const Form =()=>{
    return(
        <div className="form-main-container">
            <div className="form-container-1">
                Create a Case
            </div>
            <div className="form-container-2">
                <div>
                    <label>Complete Name</label>
                    <input type="text" name="name" value=""/>
                </div>
                <div>
                    <label>Case</label>
                    <select name="case">
                        <option value={1}>Affected</option>
                        <option value={2}>Death</option>
                        <option value={3}>Recovered</option>
                        <option value={4}>Active</option>
                        <option value={5}>Serious</option>
                    </select>
                </div>
                 <div>
                    <label>City</label>
                    <select name="case">
                        <option value={1}>Makati</option>
                        <option value={2}>Mandaluyong</option>
                        <option value={3}>Manila</option>
                        <option value={4}>Pasig</option>
                        <option value={5}>Taguig</option>
                    </select>
                </div>
            </div>
            <Bottom/>
        </div>
    )
}