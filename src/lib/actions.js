'use server'
import { redirect } from "next/navigation";
import { deleteCookie, setCookie } from "@/lib/cookies";

const usuarios = [
  {name: 'usuario1', password: 'usuario1'},
  {name: 'usuario2', password: 'usuario2'},
]


export async function login(formData) {
  const LOGIN_URL = '/'

  // Obtener usuario datos del formulario
  const name = formData.get('name')
  const password = formData.get('password')
  const callbackUrl = formData.get('callbackUrl') || LOGIN_URL

  // Comprobar si credenciales son válidas
  // const authenticated = true  // suponemos que son válidas

  const comprobacion = usuarios.find((usuario) =>
    (usuario.name === name && usuario.password == password)
)

  if (!comprobacion) return

  // Si hay autenticación correcta, creamos cookie de sesión
  await setCookie('session', { name })

  redirect(callbackUrl);
}



export async function logout() {
  // Eliminamos cookie de sesión
  deleteCookie('session')

  // redirect("/");   // No recarga si ya estamos en esta página

  // Hack to reload page! https://github.com/vercel/next.js/discussions/49345#discussioncomment-6120148
  redirect('/?' + Math.random())
}