import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { FaPencilAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

async function obtenerAlumnos(query) {
    const response = await fetch('http://localhost:4000/alumnos')
    const alumnos = await response.json()

    return alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(query))
}



async function eliminarAlumno(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/alumnos/' + id, { method: 'DELETE' })

    revalidatePath('/alumnos-api')
}


async function Alumnos({ query }) {
    const alumnos = await obtenerAlumnos(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Lista de alumnos (API)
            </h1>

            <div className='flex flex-col'>
                {alumnos.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((alumno) => (
                        <div key={alumno.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <h1>{alumno.nombre}</h1>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={alumno.id} />
                                    <button><Link href={`/alumnos-api/${alumno.id}`}><FaMagnifyingGlass /></Link></button>
                                    <button className='mr-5 ml-5' title='MODIFICAR'><Link href={`/alumnos-api/${alumno.id}/modificar`}><FaPencilAlt /></Link></button>
                                    <button formAction={eliminarAlumno} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Alumnos

