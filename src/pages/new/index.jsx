import { useState, useEffect, useContext } from "react";
import {useParams, useNavigate} from 'react-router-dom'

import Header from "../../components/header";
import Title from "../../components/title";
import  { AuthContext } from '../../context/user'
import firebase from '../../services/firebaseConnection'

import { FiPlusCircle } from "react-icons/fi";
import './new.css'
import { toast } from "react-toastify";

export default function New(){
    const {id} = useParams()
    const navigate = useNavigate() 

    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')

    const [customer, setCustomer] = useState([])
    const [loading, setLoading] = useState(true)
    const [customerSelected, setCustomerSelected] = useState(0)

    const [idCustomer, setIdCustomer] = useState(false)

    const { user } = useContext(AuthContext)

    useEffect(()=>{
       async function loadCustomers(){
          await firebase.firestore().collection('customer')
          .get()
          .then((snapshot)=>{
            let lista = []
            
            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    nomeFantasia: doc.data().nomeFantasia
                })
            })
            if(lista.length === 0){
                console.log('Nenhuma Empresa')
                setCustomer([{id: 1, nomeFantasia: 'Cadastre algum cliente'}])
                setLoading(false)
                return;
            }
            setCustomer(lista)
            setLoading(false)

            if(id){
                loadId(lista)
            }
          })
          .catch((error)=>{
            console.log('Algo deu Errado', error)
            setLoading(false)
            setCustomer([{id: '1', nomeFantasia: ''}])
          })
       }
       loadCustomers()
    },[id])

    function handleChangeCustomers(e){
        console.log('index do client selecionado', e.target.value)
        console.log('cliente selecionado', customer[e.target.value])
        setCustomerSelected(e.target.value)
    }

    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto)
            setStatus(snapshot.data().status)
            setComplemento(snapshot.data().complemento)

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId)

            setCustomerSelected(index)
            setIdCustomer(true)
        })
        .catch((error)=>{
            console.log('erro no id')
            setIdCustomer(false)
        })
    }

    async  function handleRegister(e){
        e.preventDefault()

        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente: customer[customerSelected].nomeFantasia,
                clienteId: customer[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid
            })
            .then(()=>{
                toast.success('Chamado editado com sucesso')
                setCustomerSelected(0)
                setComplemento('')
                navigate('/dashboard')
            })
            .catch((error)=>{
                console.log(error)
            })

            return
        }

        await firebase.firestore().collection('chamados')
        .add({
            created: new Date(),
            cliente: customer[customerSelected].nomeFantasia,
            clienteId: customer[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid
        })
        .then(()=>{
            toast.success('Chamado criado Com sucesso')
            setComplemento('')
            setCustomerSelected(0)
        })
        .catch((error)=>{
             toast.error('algo deu errado')
             console.log(error)   
        })    
    }
     
    function handleChangeSelect(e){
        setAssunto(e.target.value)
    }

    function handleOptionChange(e){
         setStatus(e.target.value)
    }

    return(
        <div>
            <Header/>
            <div className="content">
                 <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                 </Title>

                <div className="container">
                   <form className="form-profile" onSubmit={handleRegister}>
                       <label>Cliente</label>
                       {loading ? 
                        (<input type="text" placeholder="Carregando cliente" disabled/>)
                        :
                        (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                                {customer.map((item, index) =>{
                                    return(
                                        <option key={item.id} value={index}>
                                            {item.nomeFantasia}
                                        </option>
                                    )
                                })} 
                            </select> 
                        )
                        }
                       
                       <label>Assunto</label>
                       <select value={assunto} onChange={handleChangeSelect}>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Técnica">Visita Tecnica</option>
                        <option value="Financeiro">Financeiro</option>
                       </select>

                       <label>Status</label>
                       <div className="status">
                         <input 
                            type="radio" 
                            name="radio" 
                            value="Aberto"
                            onChange={handleOptionChange}
                            checked={status === "Aberto"}
                         />
                         <span>Em Aberto</span>
                         <input 
                            type="radio" 
                            name="radio"
                            value="Progresso" 
                            onChange={handleOptionChange}  
                            checked={status === "Progresso"}
                         />
                         <span>Progresso</span>
                         <input 
                            type="radio" 
                            name="radio" 
                            value="Atendido" 
                            onChange={handleOptionChange}
                            checked={status === "Atendido"}
                          />
                         <span>Atendido</span>
                       </div>

                       <label>Complemento</label>
                       <textarea 
                            type="text"
                            placeholder="Descreva seu Problema"
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                        >

                        </textarea>

                        <button type="submit">Salvar</button>
                   </form>    
                </div> 
            </div>
        </div>
    )
}