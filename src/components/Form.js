
const Form =() =>{
    return(
          <form class="form-container">
            <div>
              <label>Nickname</label>
              <input type="text" name="Nickname" placeholder="Nickname"></input>
            </div>
            <div>
              <label>Given name</label>
              <input type="text" name="Given name" placeholder="Given name"></input>
            </div>
            <div>
              <label>Last name</label>
              <input type="text" name="Last name" placeholder="Last Name"></input>
            </div>
           <div>
             <button type="button" onClick="submitHandler()">Submit</button>
            </div> 
        </form>
    )
}
export default Form;