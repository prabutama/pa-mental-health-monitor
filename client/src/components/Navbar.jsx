import logo from "@/assets/images/logo.svg";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // Handle logout and hide button
  const handleLogout = () => {
    logout();
    setOpen(false); // Close dropdown or mobile menu if open
  };

  // Menu items
  const Links = [
    { name: "Home", link: "#home" },
    { name: "About Us", link: "#about" },
    { name: "Services", link: "#services" },
    { name: "Artikel", link: "#artikel" },
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
            <div className="flex items-center gap-4 mt-4 mr-10 md:mt-0">
              <span className="text-gray-800 font-semibold md:ml-6 text-lg">
                <DropdownMenu>
                  <DropdownMenuTrigger>{user.name}</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link to="/result">
                    <DropdownMenuItem>Lihat Hasil</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem asChild>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button className="bg-red-500 text-white w-32">
                            Logout
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            Are you sure you want to log out?
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>
                              Yes, Logout
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
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
