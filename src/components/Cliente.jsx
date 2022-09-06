import { useNavigate } from "react-router-dom"

const Cliente = ({cliente, handleEliminar}) => {
    const navigate = useNavigate()
    const {empresa, nombre, telefono, email, id, nota} = cliente
  return (
    <tr className="border-b hover:bg-gray-100">
        <td className="p-3">{nombre}</td>
        <td>
            <p>
                <span className="uppercase text-gray-800 font-bold">Email: </span>  {email}
            </p>
            <p>
                <span className="uppercase text-gray-800 font-bold">Tel: </span>  {telefono}
            </p>
        </td>
        <td className="p-3">{empresa}</td>
        <td className="p-3">
            <button
                type="button"
                className="bg-green-600 p-2 mb-3 rounded-md font-bold text-white hover:bg-green-700 block w-full uppercase text-xs"
                onClick={() => navigate(`/clientes/${id}`)}
            >
                Ver
            </button>
            <button
                type="button"
                className="bg-blue-600 p-2 mb-3 rounded-md font-bold text-white hover:bg-blue-700 block w-full uppercase text-xs"
                onClick={() => navigate(`/clientes/editar/${id}`)}
            >
                Editar
            </button>
            <button
                type="button"
                className="bg-red-600 p-2 rounded-md font-bold text-white hover:bg-red-700 block w-full uppercase text-xs"
                onClick={() => handleEliminar(id)}
            >
                Eliminar
            </button>
        </td>

    </tr>
  )
}

export default Cliente
