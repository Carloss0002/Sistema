import './customer.css'
import Title from '../../components/title'
import Header from '../../components/header'
import firebase from '../../services/firebaseConnection'

import {FiUser} from 'react-icons/fi'
import { useState } from 'react'

import { toast } from 'react-toastify'

export default function Customer(){
    const[nomeFantasia, setNomeFantasia] = useState('')
    const[cnpj, setCnpj] = useState('')
    const[endereco, setEndereco] = useState('')

    async function handleAdd(e){
        e.preventDefault()
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== ''){
            await firebase.firestore().collection('customer')
            .add({
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco 
            })
            .then(()=>{
                setNomeFantasia('')
                setCnpj('')
                setEndereco('')
                toast.info('Empresa cadastrada com sucesso')
            })
            .catch((error)=>{
                console.log(error)
                toast.error('preencha todos os campos')
            })
        } else{
            toast.error('preencha todos os campos')
        }
    }

    return(
        <div>
           <Header/>
           <div className='content'>
               <Title name="Clientes">
                   <FiUser size={25}/>
               </Title>
               
               <article className='container'>
                   <form className="form-profile customers" onSubmit={handleAdd}>
                      <label>Nome Fantasia</label>
                      <input 
                          type="text" 
                          value={nomeFantasia} 
                          placeholder="Nome Fantasia"
                          onChange={
                            e => setNomeFantasia(e.target.value)
                           }
                       />

                      <label>CNPJ</label>
                      <input 
                          type="text" 
                          value={cnpj} 
                          placeholder="Seu CNPJ"
                          onChange={
                            e=>setCnpj(e.target.value)
                            }
                      />

                      <label>Endereço</label>
                      <input 
                            type="text" 
                            value={endereco} 
                            placeholder="Seu Endereço"
                            onChange={
                                e => setEndereco(e.target.value)
                                }
                      />
                      <button type="submit">Cadastrar</button>
                   </form>
               </article>
           </div>
        </div>
    )
}