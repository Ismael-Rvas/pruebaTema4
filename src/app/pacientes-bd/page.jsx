import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { FaPencilAlt } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SubmitButton from "@/components/submit-button";

async function eliminarPaciente(formData) {
  "use server";

  const id = formData.get("id");

  await connection.query("delete from pacientes where id=?", [id]);

  revalidatePath("/pacientes-bd");
}

async function insertarPaciente(formData) {
  "use server";

  const nombre = formData.get("nombre");
  const localidad = formData.get("localidad");
  const fechaNacimiento = formData.get("fechaNacimiento");

  await connection.query(
    "insert into pacientes (nombre, localidad, fechaNacimiento) values (?,?,?)",
    [nombre, localidad, fechaNacimiento]
  );

  revalidatePath("/pacientes-bd");
}

async function PacientesPage() {
  const [rows] = await connection.query("SELECT * FROM pacientes");

  return (
    <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
      <Link
        href="/"
        className="fixed text-4xl p-2 bg-orange-300 rounded-full mt-8"
      >
        🏠
      </Link>

      <h1 className="py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500">
        PACIENTES BD
      </h1>

      <form className="my-10 grid grid-cols-[150px_auto] gap-4">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <label htmlFor="localidad">Localidad</label>
        <input
          type="text"
          name="localidad"
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <div className="col-span-2 grid gap-2">
          <SubmitButton
            formAction={insertarPaciente}
            className="disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Insertar Paciente
          </SubmitButton>
          <button
            type="reset"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Limpiar campos
          </button>
        </div>
      </form>

      <div>
        <h1 className="text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600">
          Lista de pacientes (BD)
        </h1>
        <div className="flex flex-col">
          {rows.map((paciente) => (
            <div
              key={paciente.id}
              className="p-2 odd:bg-slate-100 flex justify-between"
            >
              <h1>{paciente.nombre}</h1>
              <div className="flex gap-6">
                <form>
                  <input type="hidden" name="id" value={paciente.id} />
                  <button>
                    <Link href={`/pacientes-bd/${paciente.id}`}>
                      <FaMagnifyingGlass />
                    </Link>
                  </button>
                  <button className="mr-5 ml-5" title="MODIFICAR">
                    <Link href={`/pacientes-bd/${paciente.id}/modificar`}>
                      <FaPencilAlt />
                    </Link>
                  </button>
                  <button formAction={eliminarPaciente} title="ELIMINAR">
                    ❌
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PacientesPage;
