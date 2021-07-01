import React from 'react';

import './cards.css';

function card(props){
    return(props.items.map(function(data){
        return(
            <div className='column'>
            <div className="card">
                <div className="container">
                <p>Name : {data.user_name}</p>
                <p>Date of Birth : {data.dob}</p>
                <p>E-mail : {data.email}</p>
                <p>Contact no. : {data.phone}</p>
                </div>
            </div>
        </div>
        );
    })  
    );
}

export default card;