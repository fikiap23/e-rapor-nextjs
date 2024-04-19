import { useState, useEffect } from 'react'

export default function Navbar(props) {
  const { role } = props

  // bg-white and when scrolling bg into transparent
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav
      className={
        scroll
          ? 'w-full px-10 py-7 transition duration-[0.7s] bg-white fixed z-10'
          : 'w-full px-10 py-4 transition duration-[0.7s] bg-transparent fixed'
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="ml-2 md:ml-10 flex justify-between items-baseline space-x-4">
            <a
              className={
                scroll
                  ? 'font-bold w-1/2 md:w-full text-sm md:block'
                  : 'font-bold w-1/2 md:w-full text-sm text-white'
              }
              href="/"
            >
              {` RA. Daarun Na'im Ambon`}
            </a>
          </div>

          {role === 'ADMIN' ? (
            <a
              className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6 md:block hidden"
              href="/admin"
            >
              Dashboard
            </a>
          ) : role === 'TEACHER' ? (
            <a
              className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6 md:block hidden"
              href="/teacher"
            >
              Dashboard
            </a>
          ) : (
            <a
              className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6 md:block hidden"
              href="/login"
            >
              Log in
            </a>
          )}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md bg-gray-800 text-gray-400 transition duration-500 ease-in-out"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden w-full bg-white my-4 rounded-2xl">
          <div className="px-2 py-6 sm:px-3 w-fit">
            {role === 'ADMIN' ? (
              <a
                className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
                href="/admin"
              >
                Dashboard
              </a>
            ) : role === 'TEACHER' ? (
              <a
                className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
                href="/teacher"
              >
                Dashboard
              </a>
            ) : (
              <a
                className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6 block md:hidden"
                href="/login"
              >
                Log in
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
