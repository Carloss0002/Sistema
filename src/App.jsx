import { BrowserRouter } from "react-router-dom"
import  Router  from "./routes"
import AuthProvider from "./context/user"

import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'

function App(){ 
      return(
            <div>
               <AuthProvider>
                  <BrowserRouter>
                        <ToastContainer autoClose={3000}/>
                        <Router/>
                  </BrowserRouter>
               </AuthProvider>   
            </div>
      )
}

export default App