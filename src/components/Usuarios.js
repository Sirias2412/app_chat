import React from 'react'
import '../estilos/infoUsuario.css'

const Usuarios = ({user}) => {
  return (
    <div className='listaUsuarios'>
        <div className='info_usuario'>
            <h4>{user.name}</h4>
        </div>       
    </div>
  )
}

export default Usuarios