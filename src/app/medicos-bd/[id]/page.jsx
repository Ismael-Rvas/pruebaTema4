import connection from "@/lib/mysql";
import Link from "next/link";

async function PaginaMedico({params}, searchParams ) {
  const { id } = await params;
  const [rows] = await connection.query("SELECT * FROM medicos WHERE id = ?", [id]);

  const medico = rows[0];

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="py-5 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500 mb-10">
        Medico #{medico.id}
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-lg flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-center text-3xl font-extrabold mb-6 text-blue-600">
          Información del medico:
        </h1>
        <p className="text-5xl font-bold text-gray-800 mb-4">{medico.nombre}</p>
        <p className="text-2xl text-gray-700 mb-2">Especialidad: {medico.especialidad}</p>
        <p className="text-2xl text-gray-700 mb-4">Perfil: {medico.perfil}</p>
      </div>
      <a
        href="/medicos-bd"
        className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline mb-28"
      >
        Volver a la página de medicos
      </a>
    </div>
  );
}

export default PaginaMedico;