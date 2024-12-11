import Menu from "@/components/menu";
import { getCookie } from "@/lib/cookies";
import { Logout } from "@/components/forms";
import { logout } from "@/lib/actions";



async function Header( ) {
    const session = await getCookie('session');

    return ( 
        //Le doy ese ultimo fixed para que se quede fijo si no es la pagina principal ya que queda mal
        <header className={`w-full h-16 px-10 flex justify-between items-center bg-blue-200 fixed top-0 left-0`}>
            <Menu />
            {session && <Logout action={logout} /> }  
        </header>
     );
}

export default Header;