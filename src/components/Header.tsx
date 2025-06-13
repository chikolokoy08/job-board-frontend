import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">Job Board</h1>
      <nav className="space-x-4">
        <Link
          to="/"
          className={`hover:underline ${location.pathname === '/' ? 'font-bold text-blue-300' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/post-job"
          className={`hover:underline ${location.pathname === '/post-job' ? 'font-bold text-blue-300' : ''}`}
        >
          Post Job
        </Link>
      </nav>
    </header>
  );
}
