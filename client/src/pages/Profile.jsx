import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import logo from "@/assets/images/logo.svg";
import { useState } from "react";

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

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-emerald-700 to-teal-500 text-white p-6 shadow-xl flex items-center justify-between">
        <div className="flex gap-4">
          <img src={logo} className="w-10 md:w-16 h-16" />
          <h1 className="text-sm md:text-3xl font-semibold mt-5">MindTrack</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className=" focus:outline-none focus:ring-0">
            <div className="flex space-x-4 focus:outline-none">
              <div className="text-white text-right">
                <p className="text-lg font-medium">{user?.name || "Name"}</p>
                <p className="text-sm">{user?.email || "Email"}</p>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c33cc13e365f92734afbb04b9e9af129c02245fe2d52e8acb0ee46191e16a17"
                alt="User"
                className="object-cover w-12 h-12 rounded-full shadow-md ring-2 ring-teal-300"
              />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-72 p-4 bg-white shadow-lg rounded-md border border-gray-200">
            <DropdownMenuLabel className="font-semibold text-gray-800">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="py-2">
              <p className="text-gray-700 font-medium">{user?.name || "Name"}</p>
              <p className="text-gray-500 text-sm">{user?.email || "Email"}</p>
            </div>
            <DropdownMenuSeparator />
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
      </header>


      {/* Main Section */}
      <main className="p-8 max-w-7xl mx-auto mt-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-md mb-6">
          <ol className="list-reset flex">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-600">Profile</li>
          </ol>
        </nav>

        {/* General Info */}
        <section className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">General Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4 text-gray-700">
                <li>
                  <span className="font-semibold">Name:</span> {user?.name || "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Email:</span> {user?.email || "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Age:</span> {user?.age || "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Gender:</span> {user?.gender || "N/A"}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Navigation and Actions */}
        <section className="flex flex-wrap gap-8 justify-start">
          <Link to="/profile/health-table">
            <Button className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all shadow-xl">
              View Table
            </Button>
          </Link>
          <Link to="/profile/health-charts">
            <Button className="px-8 py-4 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-all shadow-xl">
              View Charts
            </Button>
          </Link>
        </section>

        {/* Outlet for Nested Routes */}
        <div className="mt-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
