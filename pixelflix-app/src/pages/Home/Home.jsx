import React from 'react'
import { auth } from '../../firebase-config'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

    const handleSignOut = () => {
        try {
            signOut(auth);
            console.log('User has successfully signed out.');
            navigate('/signup');
        } catch (err) {
            console.error(err);
        }
    }

  return (
    <div>
      <h1>Home Page</h1>
      <button style={{color: 'black'}} onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}
