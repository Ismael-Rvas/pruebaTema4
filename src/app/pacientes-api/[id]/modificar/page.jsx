import { redirect } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/submit-button";

async function modificarPaciente(formData) {
  "use server";
  const id = formData.get("id");
  const nombre = formData.get("nombre");
  const localidad = formData.get("localidad");
  const fechaNacimiento = formData.get("fechaNacimiento");

  const response = await fetch(`http://localhost:4000/pacientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, localidad, fechaNacimiento }),
  });

  // Introducimos un retardo artificial de 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000))

  redirect(`/pacientes-api/${id}`);
}

async function modifyPage({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/pacientes/${id}`);
  const paciente = await response.json();

  return (
    <section className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-10">Modificar Paciente API</h1>
      <form action={modificarPaciente} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <input type="hidden" name="id" defaultValue={paciente.id} />
        <label className="text-gray-700 font-medium">Nombre</label>
        <input type="text" name="nombre" defaultValue={paciente.nombre} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <label className="text-gray-700 font-medium">Localidad</label>
        <input type="text" name="localidad" defaultValue={paciente.localidad} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <label className="text-gray-700 font-medium">Fecha de nacimiento</label>
        <input type="date" name="fechaNacimiento" defaultValue={paciente.fechaNacimiento} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <SubmitButton className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Modificar</SubmitButton>
      </form>

      <Link href={`/pacientes-api`} className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline">Volver a la página de pacientes</Link>
    </section>
  );

}

export default modifyPage;
