import React from 'react'
import { useEffect, useState} from 'react'
import {db,auth} from '../firebase'
import {collection, query, where, onSnapshot, QuerySnapshot, doc} from 'firebase/firestore'
import User from '../components/Usuarios';
import '../estilos/chat.css';

const Chat = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where ('uid', 'not-in', [auth.currentUser.uid]))
    const unsub = onSnapshot(q, querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      });
      setUser(users)
    })
    return () => unsub();
  }, []);
  console.log(users)
  return (
    <div className='appChat'>
      <div className='usuarios'>
        {users.map(user => <User key={user.uid} user={user}></User>)}
      </div>
      <div className='chat'>
          <h1>Hola</h1>
      </div>
    </div>
  )
}

export default Chat
