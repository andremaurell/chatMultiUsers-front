import React, {useState} from 'react'
import style from './Join.module.css'
import {Input, Button} from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import imageLogo from '../../assets/et_chat.jpg'

export default function Join() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (username, password) => {
    await login(username, password);
    console.log('entrei', username, password)
  }
  
  return (
    <div>
    <div className={style['fotoAuthor']}>
    <img src={imageLogo} alt="André Maurell"/>
    <h2>Creator: André Maurell</h2>
  </div>
    <div className={style['join-container']}>
      <h2 className={style['title']}>Chat em tempo real</h2>
      <form>
      <Input 
        type='text'
        placeholder='Nome de usuário'
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <Input 
        type='password'
        placeholder='Senha'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Button sx={{mt:2}} onClick={()=>handleSubmit(username, password)} variant="contained">Entrar</Button>
      <Link to="/register">
      <Button sx={{mt:2}} variant="contained">Registrar</Button>
      </Link>
      </form>
    </div>
    </div>
  )
}
