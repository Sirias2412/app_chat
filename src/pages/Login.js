import React from 'react';
import '../estilos/register.css';
import { useState } from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth} from '../firebase'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const [data, setdata] = useState({
        correo:'',
        contra:'',
        error:null,
        loading: false
    });

    const navigate = useNavigate();

    const{ correo, contra,error, loading} = data;

    const handleChange = e => {
        setdata({...data, [e.target.name]:e.target.value})
    }

    const handleSumit = async (e) => {
        e.preventDefault();
        setdata({...data, error:null, loading:true})
        try{
            const result = await signInWithEmailAndPassword(
                auth,
                correo,
                contra
            );
            setdata({
                correo: "",
                contra:"",
                error: null,
                loading: false
            })
            navigate('/chat');
        }catch{
            setdata({...data, error:'Hubo un error en al realizar el ingreso. Verifique la información e inténtelo de nuevo.' ,loading:false})
        }
    }

    return (
    <section>
        <h3>
            Ingresar
        </h3>
        <form className="formRegistrar" onSubmit={handleSumit}>
            <div className='contenedor_input'>
                <input  ctype="email" name="correo" placeholder='Correo electrónico' value={correo} onChange={handleChange}  required></input>
            </div>
            <div className='contenedor_input'>
                <input type="password" name="contra" placeholder='Contraseña' value={contra} onChange={handleChange} required></input>
            </div>
            {error ? <div className='error'>{error}</div> : null}
            <div className='contenedor_boton'>
                <button className='boton'>
                    {loading ? 'Ingresando ...' : 'Ingresar'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Login;
