import { Bottom } from "../../navigations/Bottom"
export const Form =({form, setForm})=>{
    const inputHandler =(e) =>{
        const {name, value} = e.target
        const f ={...form}
        f.inputs[name].value =value
        
        setForm(f)
    }
    return(
        <div className="form-main-container">
            <div className="form-container-1">
                Create a Case
            </div>
            <div className="form-container-2">
                <div>
                    <label>Complete Name</label>
                    <input type="text" name="name" value={form.inputs.name.value} onChange={inputHandler}/>
                </div>
                <div>
                    <label>Case</label>
                    <select name="case" value={form.inputs.case.value} onChange={inputHandler}>
                        <option value={1}>Affected</option>
                        <option value={2}>Death</option>
                        <option value={3}>Recovered</option>
                        <option value={4}>Active</option>
                        <option value={5}>Serious</option>
                    </select>
                </div>
                 <div>
                    <label>City</label>
                    <select name="case" value={form.inputs.city.value} onChange={inputHandler}>
                        <option value={1}>Makati</option>
                        <option value={2}>Mandaluyong</option>
                        <option value={3}>Manila</option>
                        <option value={4}>Pasig</option>
                        <option value={5}>Taguig</option>
                    </select>
                </div>
                 <button>Save Case</button>
            </div>
            <Bottom/>
        </div>
    )
}