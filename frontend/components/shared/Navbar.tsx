export default function Navbar() {
  return (
    <nav className="w-full px-10 py-6 ">
      <div className="flex justify-between items-center">
        <a className="font-bold" href="/">
          School Management
        </a>
        <a className="bg-blue rounded-full py-2 px-6" href="/auth/login">
          Log in
        </a>
      </div>
    </nav>
  );
}
