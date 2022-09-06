import { useState, useEffect } from "react"
import Cliente from "../components/Cliente"

const Inicio = () => {
  const [clientes, setClientes] = useState([])
  useEffect(() => {
    const obtenerClientesAPI = async() => {
      try {
        const url = "http://localhost:3000/clientes" 
        const respuesta = await fetch(url)  
        const resultado = await respuesta.json()    
        setClientes(resultado) 
      } catch (error) {
        console.log(error)
      }
    }
    obtenerClientesAPI()
  }, [])
  const handleEliminar = async id => {
    const confirmar = confirm('¿Desea eliminar el cliente?')
    if(confirmar){
      try {
        const url = `http://localhost:3000/clientes/${id}` 
        await fetch(url, {method: "DELETE"})  
        const arrayClientes = clientes.filter(cliente => cliente.id !== id)
        setClientes(arrayClientes) 
      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <>
      <h1 className="font-bold text-3xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-50">
          {clientes.map(cliente => ( 
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Inicio
