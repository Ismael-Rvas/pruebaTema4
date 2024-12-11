'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


const menu = [
    {
        text: 'Página principal',
        href: '/'
    },
    {
        text: 'Pacientes-bd',
        href: '/pacientes-bd'
    }
    // {
    //     text: 'Profesores-bd',
    //     href: '/profesores-bd'
    // },
    // {
    //     text: 'Alumnos-api',
    //     href: '/alumnos-api'
    // },
    // {
    //     text: 'Profesores-api',
    //     href: '/profesores-api'
    // }
]

function Menu() {
    const pathname = usePathname()

    return (
        <nav className="font-bold flex items-center gap-4 text-blue-500 ">

            {menu.map(item =>
                <Link
                    key={item.href}
                    href={item.href}
                    className={`hover:underline ${pathname == item.href && 'text-black no-underline'}`}>

                    {item.text}
                </Link>
            )}

        </nav>
    );
}

export default Menu;