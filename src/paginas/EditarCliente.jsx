import Formulario from "../components/Formulario"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const EditarCliente = () => {
  const {id} = useParams()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(()=> {
      const obtenerClienteAPI = async() =>{
          try {
              const url = `http://localhost:3000/clientes/${id}`
              const respuerta = await fetch(url)
              const resultado = await respuerta.json()
              setCliente(resultado)
              setCargando(false)
          } catch (error) {
              console.log(error)
              setCargando(false)
          }
      }
      obtenerClienteAPI()
  },[])


  return (
    <>
      <h1 className="font-bold text-3xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar el cliente</p>
      {cliente?.nombre ? (
      <Formulario 
        cliente={cliente}
        cargando={cargando}
      />
      ) : <p className="mt-5 text-center font-bold text-red-600 text-2xl">Client id no válido</p>
      }
    </>
  )
}

export default EditarCliente
