import { Bottom } from "../../navigations/Bottom"
export const Form =({form, setForm, lcases, setLcases})=>{
    const inputHandler =(e) =>{
        const {name, value} = e.target
        const f ={...form}
        f.inputs[name].value =value
        
        setForm(f)
    }
    const submitHandler =()=>{
        setLcases([...lcases, {name: form.inputs.name.value, case: form.inputs.case.value, city:
            form.inputs.city.value}])
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
                    <select name="city" value={form.inputs.city.value} onChange={inputHandler}>
                        <option value="Makati">Makati</option>
                        <option value="Mandaluyong">Mandaluyong</option>
                        <option value="Manila">Manila</option>
                        <option value="Pasig">Pasig</option>
                        <option value="Taguig">Taguig</option>
                    </select>
                </div>
                 <button onClick={submitHandler}>Save Case</button>
            </div>
            <Bottom/>
        </div>
    )
}