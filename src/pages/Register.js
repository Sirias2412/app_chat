import React from 'react';
import '../estilos/register.css';
import { useState } from 'react';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, db} from '../firebase'
import {setDoc, doc, Timestamp} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'

const Register = () => {

    const [data, setdata] = useState({
        nombre:'',
        correo:'',
        contra:'',
        telefono:'',
        error:null,
        loading: false
    });

    const{nombre, correo, contra, telefono,error, loading} = data;

    const handleChange = e => {
        setdata({...data, [e.target.name]:e.target.value})
    }

    const navigate = useNavigate();

    const handleSumit = async (e) => {
        e.preventDefault();
        setdata({...data, error:null, loading:true})
        try{
            const result = await createUserWithEmailAndPassword(
                auth,
                correo,
                contra
            );
            await setDoc(doc(db, 'users',result.user.uid), {
                uid: result.user.uid,
                name: nombre,
                email: correo,
                cel: telefono,
                createAt: Timestamp.fromDate(new Date())
            })
            setdata({
                nombre: "",
                correo: "",
                contra:"",
                telefono:"",
                error: null,
                loading: false
            })
            navigate('/chat');
        }catch{
            setdata({...data, error:'Hubo un error en al realizar el registro. Verifique la información e inténtelo de nuevo.' ,loading:false})
        }
    }

    return (
    <section>
        <h3>
            Crear una nueva cuenta
        </h3>
        <form className="formRegistrar" onSubmit={handleSumit}>
            <div className='contenedor_input'>
                <input type="text" name="nombre" placeholder='Nombre de usuario' value={nombre}  onChange={handleChange} required></input>
            </div>
            <div className='contenedor_input'>
                <input  ctype="email" name="correo" placeholder='Correo electrónico' value={correo} onChange={handleChange}  required></input>
            </div>
            <div className='contenedor_input'>
                <input type="text" name="contra" placeholder='Contraseña' value={contra} onChange={handleChange} required></input>
            </div>
            <div className='contenedor_input'>
                <input type="tel" name="telefono" placeholder='Telefono celular' value={telefono} onChange={handleChange} required></input>
            </div>
            {error ? <div className='error'>{error}</div> : null}
            <div className='contenedor_boton'>
                <button className='boton'>
                    {loading ? 'Creando ...' : 'Registrarse'}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Register;
