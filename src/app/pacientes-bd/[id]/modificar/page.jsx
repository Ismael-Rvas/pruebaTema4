import connection from "@/lib/mysql";
import { redirect } from "next/navigation";
import Link from "next/link";

async function modificarPaciente(formData) {
  "use server";

  const id = formData.get("id");
  const nombre = formData.get("nombre");
  const localidad = formData.get("localidad");
  const fechaNacimiento = formData.get("fechaNacimiento");

  await connection.query(
    "update pacientes set nombre = ?, localidad = ?, fechaNacimiento = ? where id = ?",
    [nombre, localidad, fechaNacimiento, id]
  );

  redirect(`/pacientes-bd/${id}`);
}

async function modifyPage({ params }) {
  const { id } = await params;

  const [rows] = await connection.query(
    "SELECT * FROM pacientes WHERE id = ?",
    [id]
  );
  const paciente = rows[0];

  return (
    <section className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-10">
        Modificar Paciente BD
      </h1>
      <form
        action={modificarPaciente}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg"
      >
        <input type="hidden" name="id" defaultValue={paciente.id} />
        <label className="text-gray-700 font-medium">Nombre</label>
        <input
          type="text"
          name="nombre"
          defaultValue={paciente.nombre}
          className="p-2 border border-gray-300 rounded-lg w-full mb-3"
        />
        <label className="text-gray-700 font-medium">Localidad</label>
        <input
          type="text"
          name="localidad"
          defaultValue={paciente.localidad}
          className="p-2 border border-gray-300 rounded-lg w-full mb-3"
        />
        <label className="text-gray-700 font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          defaultValue={paciente.fechaNacimiento.toISOString().split("T")[0]}
          className="p-2 border border-gray-300 rounded-lg w-full mb-3"
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Modificar
        </button>
      </form>
      <Link
        href={`/pacientes-bd`}
        className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline"
      >
        Volver a la página de Pacientes
      </Link>
    </section>
  );
}

export default modifyPage;
