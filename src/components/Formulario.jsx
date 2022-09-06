import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import Alerta from "./Alerta"
import Spinner from "./Spinner"

const Formulario = ({cliente, cargando}) => {
  const navigate = useNavigate();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
              .min(3, 'El nombre es muy corto')
              .max(30, 'El nombre es muy largo ')
              .required('El nombre del cliente es obligatorio'),
    empresa: Yup.string()
              .required('El nombre de la empresa es obligatorio'),    
    email: Yup.string()
              .email('Tiene que ser un email valido')
              .required('El email es obligatorio'),  
    telefono: Yup.string().matches(phoneRegExp, 'Número de telefono no valido')

  })
  const handleSubmit = async(valores) => {
    try {
      if(cliente && cliente.id) {
        const url = `http://localhost:3000/clientes/${cliente.id}`
        await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "content-type": "application/json"
          }
        })
      } else {
        const url = "http://localhost:3000/clientes"
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "content-type": "application/json"
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    cargando ? <Spinner /> : (
      <div className="mt-10 px-5 py-10 rounded-md bg-slate-50 shadow-md ">
        <h1 className="text-gray-600 font-bold text-xl uppercase text-center">{cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}</h1>
        <Formik
          initialValues={
            {
              nombre: cliente?.nombre ?? "",
              empresa: cliente?.empresa ?? "",
              email: cliente?.email ?? "",
              telefono: cliente?.telefono ?? "",
              notas: cliente?.notas ?? "" 
            }
          }
          enableReinitialize={true}
          onSubmit={async(values, {resetForm}) => {
            await handleSubmit(values)
            resetForm()
            navigate('/clientes')
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({errors, touched}) => {
            //console.log(data)
            return (
          <Form
            className="mt-10"
          >
            <div
              className="mb-4"
            >
              <label
                className="text-gray-800"
                htmlFor="nombre"
              >Nombre:</label>
              <Field 
                id="nombre"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-200"
                placeholder="Nombre del cliente"
                name="nombre"
              />
              {errors.nombre && touched.nombre ? (
                <Alerta>{errors.nombre}</Alerta>
              ) : null}
            </div>
            <div
              className="mb-4"
            >
              <label
                className="text-gray-800"
                htmlFor="empresa"
              >Empresa:</label>
              <Field 
                id="empresa"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-200"
                placeholder="Nombre de la empresa"
                name="empresa"
              />
              {errors.empresa && touched.empresa ? (
                <Alerta>{errors.empresa}</Alerta>
              ) : null}
            </div>
            <div
              className="mb-4"
            >
              <label
                className="text-gray-800"
                htmlFor="email"
              >E-mail:</label>
              <Field 
                id="email"
                type="email"
                className="mt-2 block w-full p-3 bg-gray-200"
                placeholder="Email del cliente"
                name="email" 
              />
            </div>
            {errors.email && touched.email ? (
                <Alerta>{errors.email}</Alerta>
              ) : null}
            <div
              className="mb-4"
            >
              <label
                className="text-gray-800"
                htmlFor="telefono"
              >Teléfono:</label>
              <Field 
                id="telefono"
                type="tel"
                className="mt-2 block w-full p-3 bg-gray-200"
                placeholder="Telefono del cliente"
                name="telefono"
              />
              {errors.telefono && touched.telefono ? (
                <Alerta>{errors.telefono}</Alerta>
              ) : null}
            </div>
            <div
              className="mb-4"
            >
              <label
                className="text-gray-800"
                htmlFor="notas"
              >Notas:</label>
              <Field 
                as="textarea"
                id="notas"
                type="text"
                className="mt-2 block w-full p-3 bg-gray-200 h-40"
                placeholder="Notas del cliente"
                name="notas"
              />
            </div>
            <input 
              type="submit"
              value={cliente?.nombre ? 'Editar cliente' : 'Agregar cliente'}
              className="block w-full bg-blue-800 text-white rounded-md p-3 mt-10 text-lg font-black uppercase hover:cursor-pointer hover:bg-blue-900"
            />
          </Form>
          )}}
        </Formik>
      </div>
    )
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false
}

export default Formulario
