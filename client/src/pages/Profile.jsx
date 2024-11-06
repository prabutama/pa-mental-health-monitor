import React from "react";
import { useAuth } from "@/context/AuthContext"; // Import useAuth dari AuthContext
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center w-full rounded-none pt-10 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <header className="flex flex-wrap gap-5 justify-between items-start ml-2.5 w-full text-2xl font-semibold text-black max-w-[1189px] max-md:max-w-full">
        <div className="flex flex-col mt-2.5">
          <h1 className="max-md:ml-2.5">General Information</h1>
          <Link to="/">
            <button>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9b9036408285e9a51a0f2a2e67e5892913e0e68434fb88bbb46c6243e2e5859?placeholderIfAbsent=true&apiKey=c90ca05477c14d23b4c3977b0c29e623"
                alt=""
                className="object-contain mt-4 rounded-none aspect-square w-[60px]"
              />
            </button>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c33cc13e365f92734afbb04b9e9af129c02245fe2d52e8acb0ee46191e16a17?placeholderIfAbsent=true&apiKey=c90ca05477c14d23b4c3977b0c29e623"
              alt="User profile"
              className="object-contain shrink-0 rounded-full aspect-square w-[60px]"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[300px] p-4">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>{user?.name || "Name"}</DropdownMenuLabel>
            <DropdownMenuLabel>{user?.email || "Email"}</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <section className="pl-10 mt-7 max-w-full bg-emerald-200 rounded-3xl w-[1199px] max-md:pl-5">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[44%] max-md:ml-0 max-md:w-full">
            <div className="flex z-10 flex-col self-stretch my-auto w-full text-black max-md:mt-10 max-md:max-w-full">
              <div className="flex flex-col self-start ml-10 max-md:ml-2.5">
                <h2 className="self-start text-3xl font-semibold">
                  Hi, {user?.name || "User Name"}
                </h2>
                <p className="mt-10 text-xl font-medium">
                  {user?.age || "N/A"}
                </p>
              </div>
              <div className="flex mt-3.5 w-full text-xl font-medium max-md:max-w-full">
                <div className="flex gap-4 items-start px-10 py-5 whitespace-nowrap bg-emerald-200 rounded-3xl max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/acad446501ec0ff08536e10899b1a9ccba227e2205b4f85063061ae8f729d9b0?placeholderIfAbsent=true&apiKey=c90ca05477c14d23b4c3977b0c29e623"
                    alt=""
                    className="object-contain shrink-0 aspect-square w-[35px]"
                  />
                  <span>{user?.gender || "N/A"}</span>
                </div>
                <div className="flex flex-auto gap-4 px-10 py-5 bg-emerald-200 rounded-3xl max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b9eb1149758e3ac001dea603e90d8ac407a6ac9e5965a8ed6954d5f3f3e58b3?placeholderIfAbsent=true&apiKey=c90ca05477c14d23b4c3977b0c29e623"
                    alt=""
                    className="object-contain shrink-0 aspect-square w-[35px]"
                  />
                  <span className="self-start basis-auto">Belum Menikah</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e391ea0c668dfdad587d456d9846cdd34cc97b75c5b53a93db60c160d4afb2d4?placeholderIfAbsent=true&apiKey=c90ca05477c14d23b4c3977b0c29e623"
              alt="Profile background"
              className="object-contain z-10 self-stretch my-auto -mr-8 w-full aspect-[1.68] max-md:mt-10 max-md:max-w-full"
            />
          </div>
        </div>
      </section>
      <div className="flex float-left gap-5 justify-between mt-12 max-w-full text-base font-bold text-white whitespace-nowrap w-[312px] max-md:mt-10">
        <Link to="/profile/health-table">
          <Button className="gap-2.5 px-12 py-7 bg-emerald-800 hover:bg-emerald-200 hover:text-slate-500 ease-in-out duration-300 rounded-2xl max-md:px-5">
            Tabel
          </Button>
        </Link>
        <Link to="/profile/health-charts">
          <Button className="gap-2.5 py-7 pr-12 pl-12 bg-emerald-800  hover:bg-emerald-200 hover:text-slate-500 ease-in-out duration-300 rounded-2xl max-md:px-5">
            Chart
          </Button>
        </Link>
      </div>

      <p></p>

      <Outlet />
    </div>
  );
}
