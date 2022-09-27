import {useContext} from 'react'
import {AuthContext} from '../../context/user'
import avatar from '../../assets/avatar.png'

import './header.css'
import {Link} from 'react-router-dom'
import {AiOutlineHome, AiOutlineUser, AiFillSetting} from 'react-icons/ai'

export default function Header(){
    const {user} = useContext(AuthContext)

     return(
         <div className='sidebar'>
            <div>
                <img src={user.avatarUrl === null? avatar : user.avatarUrl} alt="avatar user"/>
            </div>
            <Link to="/dashboard">
               <AiOutlineHome color="#ffff" size={24}/> 
               Chamados
            </Link>
            <Link to="/customer">
               <AiOutlineUser color="#fff" size={24}/> 
               Clientes
            </Link>
            <Link to="/profile">
               <AiFillSetting color="#fff" size={24}/> 
               Configurações
            </Link>
         </div>
     )
}