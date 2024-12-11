import connection from "@/lib/mysql";
import { redirect } from "next/navigation";
import Link from "next/link";

async function modificarAlumno(formData) {
    "use server";

    const id = formData.get("id");
    const nombre = formData.get("nombre");
    const localidad = formData.get("localidad");
    const fechaNacimiento = formData.get("fechaNacimiento");

    await connection.query(
        "update alumnos set nombre = ?, localidad = ?, fechaNacimiento = ? where id = ?",
        [nombre, localidad, fechaNacimiento, id]
    );

    redirect(`/alumnos-bd/${id}`);
}

async function modifyPage({params}) {
    const { id } = await params;

    const [rows] = await connection.query("SELECT * FROM alumnos WHERE id = ?", [id]);
    const alumno = rows[0];

    return (
        <section className="bg-gradient-to-b from-blue-300 to-blue-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-10">Modificar Alumno BD</h1>
            <form action={modificarAlumno} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <input type="hidden" name="id" defaultValue={alumno.id} />
                <label className="text-gray-700 font-medium">Nombre</label>
                <input type="text" name="nombre" defaultValue={alumno.nombre} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
                <label className="text-gray-700 font-medium">Localidad</label>
                <input type="text" name="localidad" defaultValue={alumno.localidad} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
                <label className="text-gray-700 font-medium">Fecha de nacimiento</label>
                <input type="date" name="fechaNacimiento" defaultValue={alumno.fechaNacimiento.toISOString().split("T")[0]} className="p-2 border border-gray-300 rounded-lg w-full mb-3" />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Modificar</button>
            </form>
            <Link href={`/alumnos-bd`} className="mt-6 text-black-600 hover:text-blue-800 transition duration-300 ease-in-out font-bold underline">Volver a la página de alumnos</Link>
        </section>
    );
}

export default modifyPage;