import { redirect } from 'next/navigation'
import { getToken } from '../lib/fetch';
import { setCookies } from '../lib/cookies'
import Link from "next/link";

async function login(formData: FormData) {
    // Create the session
    const API_TOKEN_URL =  process.env.API_TOKEN_URL as string
    const response = await getToken(API_TOKEN_URL, formData)
    if(response.status != 200)
        redirect("/login")  // implement fail authenticate
    const token = await response.json()
    // Save the session in a cookie
    setCookies('jwt', token['access_token'])
    setCookies('username', formData.get('username') as string)
}

export function LoginForm(){
    return (
        <form className="mt-6" action={async (formData) => {
            "use server"
            await login(formData)
            redirect("/dashboard")
        }}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              type="username"
              name='username'
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              name='password'
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Forget Password?
          </Link>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>
        )
}
