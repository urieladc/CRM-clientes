import Formulario from "../components/Formulario"

const NuevoCliente = () => {
  return (
    <>
      <h1 className="font-bold text-3xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Rellena los siguientes campos para dar de alta un nuevo cliente</p>
      <Formulario />
    </>
  )
}

export default NuevoCliente
