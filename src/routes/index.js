import {Routes, Route} from 'react-router-dom';
import RouteWrapper from './Route'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../components/profile';
import Customer from '../pages/customers'
import New from '../pages/new';

export default function Router(){
    return(
        <Routes>
            <Route path='/' element={<RouteWrapper loggedComponent={<Dashboard/>} defaultComponent={<SignIn/>}/>}/>
            <Route path='/register' element={<RouteWrapper loggedComponent={<Dashboard/>} defaultComponent={<SignUp/>}/>}/>
            <Route path='/dashboard' element={<RouteWrapper loggedComponent={<Dashboard/>} defaultComponent={<SignIn/>} isPrivate/>}/>
            <Route path='/customer' element={<RouteWrapper loggedComponent={<Customer/>} defaultComponent={<SignIn/>} isPrivate/>}/>
            <Route path='/profile' element={<RouteWrapper loggedComponent={<Profile/>} defaultComponent={<SignIn/>} isPrivate/>}/>
            <Route path='/new' element={<RouteWrapper loggedComponent={<New/>} defaultComponent={<SignIn/>} isPrivate/>}/>
            <Route path='/new/:id' element={<RouteWrapper loggedComponent={<New/>} defaultComponent={<SignIn/>} isPrivate/>}/>
        </Routes>
    )
}