import { useState, useContext } from 'react'
import'./signIn.css'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../context/user'

function SignIn(){
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const {loginUser} = useContext(AuthContext)

   function handleSubmit(e){
        e.preventDefault()
        if(email !== '' && password !== ''){
           loginUser(email, password)
        }
   }

   return(
       <div className='container-center'>
         <div className='login'>
            <div className='logo-area'>
               <img src={logo} alt="Sistema logo" />
            </div>
            <form onSubmit={handleSubmit}>
               <h1>Entrar</h1>
               <input 
                  type="text" 
                  placeholder='email@email.com' 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
               <input 
                  type="password" 
                  placeholder='*****' 
                  value={password}
                  onChange={e=> setPassword(e.target.value)}
               />
               <button type="submit">Acessar</button>
            </form>
             
             <Link to="/register">Criar uma conta</Link>
         </div>
       </div>
   )
}

export default SignIn