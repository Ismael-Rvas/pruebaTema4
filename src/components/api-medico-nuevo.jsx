import { revalidatePath } from "next/cache";
import SubmitButton from "@/components/submit-button";


async function nuevoMedico(formData) {
    'use server'
    const nombre = formData.get('nombre');
    const especialidad = formData.get('especialidad');
    const perfil = formData.get('perfil');

    const response = await fetch('http://localhost:4000/medicos', {
        method: 'POST',
        body: JSON.stringify({ nombre, especialidad: especialidad, perfil: perfil})
    })
    
    revalidatePath('/medicos-api')
}



function MedicoNew() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='especialidad'>Especialidad</label>
            <input required id='especialidad' name='especialidad' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='perfil'>Perfil</label>
            <input required id='perfil' name='perfil' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <SubmitButton formAction={nuevoMedico} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar Medico
                </SubmitButton>
                <button type='reset' className='bg-blue-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default MedicoNew;
