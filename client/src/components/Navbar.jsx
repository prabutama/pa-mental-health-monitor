import logo from '@/assets/images/logo.svg';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext'; // Import context

const Navbar = () => {
  const { user, logout } = useAuth(); // Mengambil user dan logout dari context

  let Links = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '#aboutUs' },
    { name: 'Service', link: '#services' },
    { name: 'Artikel', link: '#artikel' },
  ];

  let [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="flex gap-4">
          <img src={logo} alt="Logo" />
          <h1 className="text-3xl font-semibold mt-1">MindTrack</h1>
        </div>

        <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden">
          <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ' : 'top-[-490px]'} `}>
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl font-semibold md:my-0 my-7">
              <a href={link.link} className="text-gray-800 hover:text-gray-400 duration-500">
                {link.name}
              </a>
            </li>
          ))}

          {/* Menampilkan Login atau Nama User dan Logo Profil */}
          {user ? (
            <div className="flex items-center md:ml-8">
              <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
              <span className="text-gray-800 font-semibold">{user.name}</span>
              <Button
                onClick={logout} // Memanggil logout dari context
                className="ml-4 bg-red-700 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded-full"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to={'/login'}>
              <Button className="bg-green-700 hover:bg-green-900 text-white font-semibold py-5 px-8 rounded-full lg:ml-8">Login</Button>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
