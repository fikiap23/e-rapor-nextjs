export default function Navbar(props) {
  const { role } = props;
  return (
    <nav className="w-full px-10 py-4 bg-white">
      <div className="flex justify-between items-center">
        <a className="font-bold text-xs max-w-52" href="/">
          TK ERLANGGA CIRACAS ASY SYAMS ISLAMIC SCHOOL
        </a>
        {role === "ADMIN" ? (
          <a
            className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
            href="/admin"
          >
            Dashboard
          </a>
        ) : role === "TEACHER" ? (
          <a
            className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
            href="/teacher"
          >
            Dashboard
          </a>
        ) : (
          <a
            className="bg-blue-500 text-white font-semibold rounded-full py-2 px-6"
            href="/login"
          >
            Log in
          </a>
        )}
      </div>
    </nav>
  );
}
