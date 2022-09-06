import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Spinner from "../components/Spinner"

const VerCliente = () => {
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
         cargando ? <Spinner /> :  Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
            <div>
            
                <>
                    <h1 className="font-bold text-3xl text-blue-900">Ver Cliente {cliente.nombre}</h1>
                    <p className="mt-3">Información del cliente</p>
                    {cliente.nombre && (
                    <p className="text-4xl text-gray-600 mt-10">
                        <span className="text-gray-800 uppercase font-bold">Cliente: </span> 
                        {cliente.nombre}
                    </p>
                    )}
                    {cliente.email && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Email: </span> 
                        {cliente.email}
                    </p>
                    )}
                    {cliente.telefono && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Teléfono: </span> 
                        {cliente.telefono}
                    </p>
                    )}
                    {cliente.empresa && (
                    <p className="text-2xl text-gray-600 mt-4">
                        <span className="text-gray-800 uppercase font-bold">Empresa: </span> 
                        {cliente.empresa}
                    </p>
                    )}
                    {cliente.notas && (
                        <p className="text-2xl text-gray-600 mt-4">
                            <span className="text-gray-800 uppercase font-bold">Notas: </span> 
                            {cliente.notas}
                        </p>
                    )}
                </>
            
            </div>
        )
       
    )
}

export default VerCliente