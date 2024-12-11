import { redirect } from "next/navigation";
import Link from "next/link";

async function modificarProfesor(formData) {
  "use server";
  const id = formData.get("id");
  const nombre = formData.get("nombre");
  const especialidad = formData.get("especialidad");
  const estadoCivil = formData.get("estadoCivil");

  const response = await fetch(`http://localhost:4000/profesores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre, especialidad, estadoCivil }),
  });

  redirect(`/profesores-api/${id}`);
}

async function modifyPage({ params }) {
  const { id } = await params;

  const response = await fetch(`http://localhost:4000/profesores/${id}`);
  const profesor = await response.json();

  return (
    <section className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-10">Modificar Profesor API</h1>
      <form action={modificarProfesor} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <input type="hidden" name="id" defaultValue={profesor.id} />
        <label className="text-gray-700 font-medium">Nombre</label>
        <input type="text" name="nombre" defaultValue={profesor.nombre} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <label className="text-gray-700 font-medium">Especialidad</label>
        <input type="text" name="especialidad" defaultValue={profesor.especialidad} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <label className="text-gray-700 font-medium">Estado Civil</label>
        <input type="text" name="estadoCivil" defaultValue={profesor.estadoCivil} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Modificar</button>
      </form>
      <Link href={`/profesores-api`} className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline">Volver a la página de profesores</Link>
    </section>
  );
}

export default modifyPage;
