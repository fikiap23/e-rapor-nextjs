import { useState, useEffect } from "react";

export default function Navbar(props) {
  const { role } = props;

  // bg-white and when scrolling bg into transparent
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={
        scroll
          ? "w-full px-10 py-4 transition duration-[0.7s] bg-[#007C11] fixed z-10"
          : "w-full px-10 py-4 transition duration-[0.7s] bg-transparent fixed"
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="ml-0 md:ml-10 flex justify-between items-baseline space-x-4 md:w-fit w-full">
            <a
              className={
                scroll
                  ? "font-bold w-1/2 md:w-full text-xs md:text-sm md:block text-white"
                  : "font-bold w-1/2 md:w-full text-xs md:text-sm text-white"
              }
              href="/"
            >
              {` RA. Daarun Na'im Ambon`}
            </a>
          </div>
          <div className="flex gap-7 items-center">
            {role === "ADMIN" ? (
              <a
                className={
                  scroll
                    ? "bg-white text-[#007C11] font-semibold transition duration-[0.7s] rounded-full py-2 px-6 md:block hidden"
                    : "bg-[#007C11] text-white font-semibold transition duration-[0.7s] rounded-full py-2 px-6 md:block hidden"
                }
                href="/admin"
              >
                Dashboard
              </a>
            ) : role === "TEACHER" ? (
              <a
                className={
                  scroll
                    ? "bg-white text-[#007C11] font-semibold transition duration-[0.7s] rounded-full py-2 px-6 md:block hidden"
                    : "bg-[#007C11] text-white font-semibold transition duration-[0.7s] rounded-full py-2 px-6 md:block hidden"
                }
                href="/teacher"
              >
                Dashboard
              </a>
            ) : (
              <a
                className={
                  scroll
                    ? "bg-white text-[#007C11] font-semibold transition duration-[0.7s] rounded-full py-2 px-6 md:block hidden"
                    : "bg-[#007C11] text-white font-semibold transition duration-[0.7s] rounded-full py-2 px-6 md:block hidden"
                }
                href="/login"
              >
                Login
              </a>
            )}
            <div className="bg-white md:flex gap-2 p-2 rounded-l-3xl rounded-tr-3xl rounded-br-lg hidden">
              <img
                src="/images/images__1_-removebg.png"
                alt=""
                className="w-16"
              />
              <img src="/images/logo.png" alt="" className="w-12" />
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-1 rounded-lg bg-[#007C11] text-white transition duration-500 ease-in-out"
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
        <div className="md:hidden w-full my-4 rounded-2xl">
          <div className="px-2 py-6 sm:px-3 w-fit flex items-center gap-20">
            {role === "ADMIN" ? (
              <a
                className={
                  scroll
                    ? "bg-white text-[#007C11] font-semibold transition duration-[0.7s] rounded-full py-2 px-6 block md:hidden"
                    : "bg-[#007C11] text-white font-semibold transition duration-[0.7s] rounded-full py-2 px-6 block md:hidden"
                }
                href="/admin"
              >
                Dashboard
              </a>
            ) : role === "TEACHER" ? (
              <a
                className={
                  scroll
                    ? "bg-white text-[#007C11] font-semibold transition duration-[0.7s] rounded-full py-2 px-6 block md:hidden"
                    : "bg-[#007C11] text-white font-semibold transition duration-[0.7s] rounded-full py-2 px-6 block md:hidden"
                }
                href="/teacher"
              >
                Dashboard
              </a>
            ) : (
              <a
                className={
                  scroll
                    ? "bg-white text-[#007C11] font-semibold transition duration-[0.7s] rounded-full py-2 px-6 block md:hidden"
                    : "bg-[#007C11] text-white font-semibold transition duration-[0.7s] rounded-full py-2 px-6 block md:hidden"
                }
                href="/login"
              >
                Log in
              </a>
            )}
            <div className="bg-white flex gap-2 p-2 rounded-l-3xl rounded-tr-3xl rounded-br-lg md:hidden">
              <img
                src="/images/images__1_-removebg.png"
                alt=""
                className="w-12"
              />
              <img src="/images/logo.png" alt="" className="w-8" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
