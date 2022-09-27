import { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {AuthContext} from '../../context/user'

import firebase from'../../services/firebaseConnection'

function SignUp(){
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[senha, setSenha]=useState('')
    
    const {signUp} = useContext(AuthContext)
    
    async function handleCadastro(e){
        e.preventDefault()
        
        if(name !== '' && email !== '' && senha !== ''){
            signUp(email, senha, name)
        }
    }

     return(
        <div className='container-center'>
            <div className="login">
                <div className="logo-area">
                  <img src={logo} alt="Sistema Logo" />
                </div>
                <form onSubmit={handleCadastro}>
                    <h1>Cadastrar uma conta</h1>
                    <input 
                         type="text"  
                         value={name} 
                         onChange={e=>setName(e.target.value)}
                         placeholder="Seu Nome"
                    />

                    <input 
                         type="text"  
                         value={email} 
                         onChange={e => setEmail(e.target.value)}
                         placeholder="email@email.com"
                    />
                    <input 
                         type="password"  
                         value={senha} 
                         onChange={e => setSenha(e.target.value)}
                         placeholder="******"
                    />
                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/">Já possui uma conta?</Link>
            </div>
        </div>
     )
}

export default SignUp