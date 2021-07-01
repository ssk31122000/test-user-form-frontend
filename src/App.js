
import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Allforms from "./allforms";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function RegistrationForm(){
  return (
    <div className="card-header">
            Register Form
        </div>
  );
}

function Alert(props){
  return (
    <div className="alert alert-danger d-flex align-items-center" role="alert" >
      <div>
        {props.message}
      </div>
    </div>
  );
}

function Input(props){
  var alert = props.alert==='true'?<Alert message={props.alertmessage}/>:<div></div>
  return (
    <div className="mb-3">
      <label className="form-label">{props.label}</label>
      <input className="form-control" required {...props}/>
      {alert}
    </div>
  );
}

function SubmitButton(props){

  return (
    <button type="submit" className="btn btn-primary" {...props} >Submit</button>
  );
}

function Form(){
  
  const [state, setState]= useState({name:"",dob:"",email:"",phone:""});

  const [ageAlert, setAgeAlert] = useState('false');
  const [phoneAlert, setPhoneAlert] = useState('false');

  function handleOnChange(event) {
    setState((prevState) => {
      let d = event.target.name;
      prevState[d] = event.target.value;
      return prevState;
    });
  }

  function handleAge(event) {
    handleOnChange(event);
    const age = getAge(state[event.target.name]);
    if(age < 18){
      setAgeAlert('true');
    }else{
      setAgeAlert('false');
    }
  }

  function getAge(birthDate){
    var hbd = new Date(birthDate);
    var today = new Date();
    var age = today.getFullYear() - hbd.getFullYear()
    var m = today.getMonth() - hbd.getMonth();
    if(m < 0 || (m===0 && today.getDate() < hbd.getDate())){
      age--;
    }
    return age;
  }

  async function  handleSubmit(props){
    props.preventDefault();
    console.log(state);

    document.getElementById('wait').innerHTML = "Please Wait";
    var form = document.getElementById("form");
    var elements = form.elements;
    for (var i = 0, len = elements.length; i < len; ++i) {
      elements[i].disabled = true;
    }

    let p2 = await Axios.post('https://user-form-backend-ssk.herokuapp.com/validate',state);
    console.log(p2)
    if(p2.data.isValid === "false"){
      document.getElementById('wait').innerHTML = "";
      for (var i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = false;
      }
      setPhoneAlert('true')
      return;
    }
    
    let p1 = await Axios.post('https://user-form-backend-ssk.herokuapp.com/',state);
    console.log(p1)
    let p= await Axios.post('https://user-form-backend-ssk.herokuapp.com/add',state);
    console.log(p)
    window.location.replace("/users");
    
    
  }

  const submitButton = ageAlert==='true'?<SubmitButton disabled/>:<SubmitButton />;

  return (
    <div>
      <form onSubmit={handleSubmit} id="form">
        <Input label='Name' type='text' name='name' onChange={handleOnChange}/>
        <Input alert={ageAlert} alertmessage='Age should be greater than 18' label='Date of Birth' type='date' name='dob' onChange={handleAge} />
        <Input label='E-mail' type='email' name='email' onChange={handleOnChange} />
        <Input label='Contact No.'alert={phoneAlert} alertmessage='Invalid contact no.' type='tel' name='phone' onChange={handleOnChange} placeholder="Enter 10-digit contact no."/>
        {submitButton}
        <p id="wait"></p>
      </form>
    </div>
  );
}

function userform(){
  return(
    <div className="container mt-4">
      <div className="card">
        <RegistrationForm />
        <div className="card-body">
          <Form />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path='/' exact component={userform}/>
        <Route path='/users' exact component={Allforms}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
