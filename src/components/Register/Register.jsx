import React, {useState} from 'react'
import style from './Register.module.css'
import {Input, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import imageLogo from '../../assets/et_chat.jpg'
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3001/register', { username, password })
        .then(res => {
            navigate('/');
            console.log('Usuário cadastrado com sucesso!', response.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
  
  return (
    <div>
    <div className={style['fotoAuthor']}>
    <img src={imageLogo} alt="André Maurell"/>
    <h2>Creator: André Maurell</h2>
  </div>
    <div className={style['join-container']}>
      <h2 className={style['title']}>Chat em tempo real</h2>
        <form onSubmit={handleSubmit}>
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
      <Button sx={{mt:2}} onClick={handleSubmit} variant="contained">Registrar</Button>
      <Link to="/">
      <Button sx={{mt:2}} variant="contained">Entrar</Button>
      </Link>
        </form>
    </div>
    </div>
  )
}
