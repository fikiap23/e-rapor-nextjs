'use client'
import { useState } from 'react'
import authService from '@/services/auth.service'
import '../../tailwind.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import useAuth from '@/hooks/useAuth'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { token, setToken } = useAuth()
  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const payload = { username, password }
      const result = await authService.login(payload)
      console.log(`Login result: ${result.access_token}`)
      const accessToken = result.access_token

      setToken(accessToken)
      // simpan  ke cookie
      document.cookie = `token=${accessToken};path=/;max-age=3600`
      toast.success('Login success', {
        position: 'top-right',
      })
      // Redirect to home
      push('/')
      setIsLoading(false)
    } catch (error) {
      toast.error(error, {
        position: 'top-right',
      })
      console.log(`Login error: ${error}`)
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-[url('https://ensys.bekasikota.go.id/uploads/galeri/69915167/69915167-6f268633-60ed-45fc-8e23-6d9b0fa5e33e.jpeg?1639816268')] bg-no-repeat bg-cover bg-center justify-around items-center hidden">
          <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl drop-shadow-xl">
            <h1 className="text-white font-bold text-4xl font-sans">
              Taman Karya
            </h1>
            <p className="text-white mt-1">
              TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL
            </p>
            <button className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">
              Beranda
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <div className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Halo, Selamat Datang
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Silahkan Login untuk melanjutkan
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="username"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
