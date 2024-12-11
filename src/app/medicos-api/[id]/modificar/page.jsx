import { redirect } from "next/navigation";
import Link from "next/link";

async function modificarMedico(formData) {
  "use server";
  const id = formData.get("id");
  const nombre = formData.get("nombre");
  const especialidad = formData.get("especialidad");
  const perfil = formData.get("perfil");

  const response = await fetch(`http://localhost:4000/medicos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, especialidad, perfil: perfil }),
  });

  // Introducimos un retardo artificial de 2 segundos
  await new Promise(resolve => setTimeout(resolve, 2000))

  redirect(`/medicos-api/${id}`);
}

async function modifyPage({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/medicos/${id}`);
  const medico = await response.json();

  return (
    <section className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-10">Modificar Medico API</h1>
      <form action={modificarMedico} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <input type="hidden" name="id" defaultValue={medico.id} />
        <label className="text-gray-700 font-medium">Nombre</label>
        <input type="text" name="nombre" defaultValue={medico.nombre} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <label className="text-gray-700 font-medium">Especialidad</label>
        <input type="text" name="especialidad" defaultValue={medico.especialidad} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <label className="text-gray-700 font-medium">Estado Civil</label>
        <input type="text" name="perfil" defaultValue={medico.perfil} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Modificar</button>
      </form>
      <Link href={`/medicos-api`} className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline">Volver a la página de medicos</Link>
    </section>
  );
}

export default modifyPage;
