import { revalidatePath } from "next/cache";
import SubmitButton from "@/components/submit-button";


async function nuevoPaciente(formData) {
    'use server'
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fechaNacimiento = formData.get('fechaNacimiento');

    const response = await fetch('http://localhost:4000/pacientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, localidad, fechaNacimiento})
    })

    // Introducimos un retardo artificial de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    revalidatePath('/pacientes-api')
}



function PacienteNew() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='localidad'>localidad:</label>
            <input required id='localidad' name='localidad' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fechaNacimiento'>Fecha Nacimiento</label>
            <input required id='fechaNacimiento' name='fechaNacimiento' type='date' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <SubmitButton formAction={nuevoPaciente} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar Paciente
                </SubmitButton>
                <button type='reset' className='bg-blue-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default PacienteNew;
