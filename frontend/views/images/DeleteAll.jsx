/* eslint-disable react/prop-types */
import React from 'react';
import {
  Link,
  Redirect
} from 'react-router-dom';
import { useAuth0 } from '../../utils/react-auth0-spa';
import axios from 'axios';

export default function DeleteAll(props) {
  const { path } = props;
  const { getTokenSilently } = useAuth0();

  const handleClick = async() => {
    const token = await getTokenSilently();
    const instance = axios.create({
      baseURL: 'https://api.ogamba.com/paint/private',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'https://api.ogamba.com',
        'Access-Control-Allow-Methods': '*'
      },
      crossDomain: true
    });
    const result = await instance.delete('/svgs/delete/all');
    console.log(result);
    setTimeout(() => {
      return <Redirect to={`${path}`} />;
    });
  }
  return (
    <div className='content'>
      <h5>Delete All Images?</h5>
      <p>Are you sure that you want to delete all the images?</p>
      <button className='btn btn-danger' onClick={handleClick}>Yes</button>
      <Link to={`${path}`} >
        <button className='btn btn-dark'>Go Back</button>
      </Link>
    </div>
  )
}
