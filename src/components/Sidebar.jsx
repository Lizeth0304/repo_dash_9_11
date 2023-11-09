import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiDashboardLine,
  RiBriefcaseLine,
  RiCalendar2Line,
  RiMessage2Line,
  RiLogoutBoxRLine,
  RiMenu3Fill,
  RiCloseLine,
} from "react-icons/ri";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed lg:static w-[65%] md:w-[40%] lg:w-full top-0 z-50 bg-white transition-all ${
          isOpen ? "-left-0" : "-left-full"
        } w-full h-full overflow-y-scroll col-span-1 p-5 border-r`}
      >
        {/* Logotipo */}
        <div className="text-center p-5 mt-032 flex flex-col items-center justify-center">
          
          <p className="font-bold text-sm font-serif">UNIVERSIDAD NACIONAL DE EDUCACIÓN</p>
          <p className="font-bold text-xs font-serif" >Enrique Guzmán y Valle</p>
          <p className="font-bold text-xs font-serif italic">"Alma Máter del Magisterio Nacional"</p>
          <p className="font-bold mb-5 text-sm font-serif">RECTORADO</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Escudo_UNE.png"
            alt=""
            className="w-20 h-auto"
          />
        </div>
        <div className="flex flex-col justify-between h-[800px]">
          {/* Menu */}
          <nav>
            <ul>
              <li>
                <Link
                  to={"/"}
                  className="flex items-center gap-4 hover:bg-purple-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  <RiDashboardLine />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/Tramite"}
                  className="flex items-center gap-4 hover:bg-purple-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  <RiBriefcaseLine />
                  Tramite
                </Link>
              </li>
              <li>
                <Link
                  to={"/Correo"}
                  className="flex items-center gap-4 hover:bg-purple-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  <RiCalendar2Line />
                  Correo
                </Link>
              </li>
              <li>
                <Link
                  to={"/Pruebas"}
                  className="flex items-center gap-4 hover:bg-purple-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
                >
                  <RiMessage2Line />
                  Pruebas
                </Link>
              </li>
            </ul>
          </nav>
          {/* imagen and logout*/}
          <div className="flex flex-col gap-4">
            <img src="img.svg" alt="Image" />
            {/* Update */}
            <div className="bg-purple-50 p-8 flex flex-col gap-4 rounded-3xl">
              <h3 className="text-xl text-center">Visítanos</h3>
              <p className="text-gray-500 text-center">
                Puedes visitar nuestra página{" "}
              </p>
              <button className="bg-purple-600 text-white p-2 rounded-lg">
                <a href="https://www.une.edu.pe/uneweb/" target="_blank">Click Aquí</a>
              </button>
            </div>

            <Link
              to={""}
              className="flex items-center gap-4 hover:bg-purple-500 p-4 text-gray-400 hover:text-white rounded-lg transition-colors font-semibold"
            >
              <RiLogoutBoxRLine />
              Logout
            </Link>
          </div>
        </div>
      </div>
      <button
        onClick={handleSidebar}
        className="block lg:hidden fixed bottom-4 right-4 bg-purple-600 p-2 text-white rounded-full text-2xl z-40 "
      >
        {isOpen ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
    </>
  );
};

export default Sidebar;
