import Link from "next/link";
import { notFound } from "next/navigation";

async function obtenerProfesor(id) {
  const response = await fetch("http://localhost:4000/profesores/" + id);
  if (!response.ok) notFound();
  const profesor = await response.json();

  return profesor;
}

async function ProfesorPage({ params }) {
  const { id } = await params;
  const profesor = await obtenerProfesor(id);

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="py-5 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500 mb-10">
        Profesor #{profesor.id}
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-lg flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-center text-3xl font-extrabold mb-6 text-blue-600">
          Información del profesor:
        </h1>
        <p className="text-5xl font-bold text-gray-800 mb-4">{profesor.nombre}</p>
        <p className="text-2xl text-gray-700 mb-2">Especialidad: {profesor.especialidad}</p>
        <p className="text-2xl text-gray-700 mb-4">Estado Civil: {profesor.estadoCivil}</p>
      </div>
      <Link
        href="/profesores-api"
        className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline mb-28"
      >
        Volver a la página de profesores
      </Link>
    </div>
  );
}

export default ProfesorPage;
