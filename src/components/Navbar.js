import React from 'react'
import { Link } from 'react-router-dom'
import '../estilos/navBar.css';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const handleSingout = async () => {
    await auth.signOut().then(()=>{
      navigate('/');
    })
  };

  return (
    <nav>
        <h1>
          <Link to='/'>App Chat</Link>
        </h1>
        <div>
          {auth.currentUser ? (
            <button className='btn' onClick={handleSingout}> Salir</button> 
          ): (
            <>
              <Link to='/register'>Registrase</Link>
              <Link to='/login'>Ingresar</Link>
            </>
          )}
        </div>
    </nav>
  )
}

export default Navbar