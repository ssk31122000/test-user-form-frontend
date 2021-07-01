import React,{useState,useEffect}from 'react';

import Card from './card';
import Axios from 'axios';



function GetItems() {
    const [state,setState]=useState([])
  
    useEffect(()=>{
      Axios.get('https://user-form-backend-ssk.herokuapp.com/all').then(response => {
        setState(response.data)
      })
      .catch(e => {
          console.log(e);
      });
    },[])
    
    console.log(state)
    return state
  }
  
  
  
  
  function allforms(){
    const items = GetItems();
    return(
        <div>
            <div>
            <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
                <a className="btn btn-outline-success"  role="button" href="/">Register</a>
            </form>
            </nav>
            </div>
        <div>
            <Card items={items}/>
        </div>
        </div>
    );
  }

  export default allforms;