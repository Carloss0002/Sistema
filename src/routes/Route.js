import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/user";
import {useContext} from 'react'

export default function RouteWrapper({loggedComponent, isPrivate, defaultComponent}){
    const {signed, loadingAuth} = useContext(AuthContext)

    if(loadingAuth){
        return(
            <div>Carregando informações</div>
        )
    }
    
    if(!signed && isPrivate){
        return <Navigate to="/"/>
    }
    if(signed && !isPrivate){
       return <Navigate to="/dashboard"/>
    }

    return signed? loggedComponent : defaultComponent
}