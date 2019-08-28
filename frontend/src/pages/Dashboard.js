import React from 'react';
import api from '../services/api';

export default function Dashboard({ history }){

    api.get('/dashboard', {
        headers: {
            authorization: "Bearer "
        }

    })

    console.log(history);
  
    return (
        <h1>Dashboard</h1>
    );
  
}
