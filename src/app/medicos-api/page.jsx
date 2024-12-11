import Link from "next/link";
import Fallback from "@/components/fallback";
import Medicos from "@/components/api-medicos";
import ProfesorNuevo from "@/components/api-medico-nuevo";
import { Suspense } from "react";



async function ProfesoresPage({ searchParams }) {
    const { query } = await searchParams;

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return (
        <section className="min-h-screen max-w-[1024px] mx-auto px-10 py-10">
            <Link href="/" className="fixed text-4xl p-2 bg-orange-300 rounded-full mt-8">🏠</Link>

            <h1 className='py-10 text-3xl text-blue-500 text-center border-b-4 border-b-blue-500'>
                PROFESORES API REST
            </h1>

            <Suspense fallback={<Fallback>Nuevo Alumno ... </Fallback>}>
                <ProfesorNuevo />
            </Suspense>

            <Suspense fallback={<Fallback>Obteniendo datos ... </Fallback>}>
                <Medicos query={query || ''} />
            </Suspense>
        </section>
    );
}

export default ProfesoresPage;