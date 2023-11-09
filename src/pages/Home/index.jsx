import React, { useState } from "react";
import { Link } from "react-router-dom";


import {
  
  RiCloseLine,  
  RiArrowDownSLine,
  RiSearchLine,  
  RiFilter3Line,
  RiMapPinRangeLine,
  RiDropboxFill,
  RiTwitchLine,
  RiGoogleLine,
  RiAmazonLine
} from "react-icons/ri";

const Home = () => {
  
  return (
    <>
      <div className="min-h-screen grid grid-col-1 lg:grid-cols-6 ">
        {/* Sidebar - Primer Bloque */}
        
        {/* Btn Menu movil */}
        

        {/* Content - Segundo Bloque */}
        <div className="col-span-6">
          {/* Header */}
          
          {/* Content */}
          <div className="p-4 md:p-8 lg:12 bg-gray-100">
            {/* Title  */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold">Home</h1>
            </div>
            {/* Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-6">
              <form className="col-span-1 md:col-span-2">
                <div className="relative">
                  <RiSearchLine className="absolute left-2 top-3 text-purple-600" />
                  <input
                    type="text"
                    className="bg-white py-2 pl-8 pr-4 outline-none  w-full"
                    placeholder="Buscar"
                  />
                </div>
              </form>
              <form className="col-span-1">
                <div className="relative">
                  <RiMapPinRangeLine className="absolute left-2 top-3 text-purple-600" />
                  <select
                    type="text"
                    className="bg-white py-[10px] pl-8 pr-4 outline-none  w-full"
                    placeholder="Search"
                  >
                    <option>Anywhere</option>
                  </select>
                </div>
              </form>
              <form className="col-span-1">
                <div className="relative">
                  <RiFilter3Line className="absolute left-2 top-3 text-purple-600" />
                  <input
                    type="text"
                    className="bg-white py-2 pl-8 pr-4 outline-none  w-full"
                    placeholder="Filters"
                  />
                  <span className="absolute text-sm right-2 top-[7px] bg-purple-600 text-white py-1 px-[9px] rounded-full">
                    4
                  </span>
                </div>
              </form>
            </div>
            {/* T */}
            <div className="flex items-center flex-wrap gap-4 mb-20">
              <span className="bg-white flex items-center gap-4 py-2 pl-4 pr-6 rounded-full">
                <button className="bg-purple-100 p-1 rounded-full text-purple-600 text-xs">
                  <RiCloseLine />
                </button>{" "}
                <span className="text-gray-500">Design</span>
              </span>
              <span className="bg-white flex items-center gap-4 py-2 pl-4 pr-6 rounded-full">
                <button className="bg-purple-100 p-1 rounded-full text-purple-600 text-xs">
                  <RiCloseLine />
                </button>{" "}
                <span className="text-gray-500">Regular</span>
              </span>
              <span className="bg-white flex items-center gap-4 py-2 pl-4 pr-6 rounded-full">
                <button className="bg-purple-100 p-1 rounded-full text-purple-600 text-xs">
                  <RiCloseLine />
                </button>{" "}
                <span className="text-gray-500">Full time</span>
              </span>
              <span className="bg-white flex items-center gap-4 py-2 pl-4 pr-6 rounded-full">
                <button className="bg-purple-100 p-1 rounded-full text-purple-600 text-xs">
                  <RiCloseLine />
                </button>{" "}
                <span className="text-gray-500">B2B</span>
              </span>
              <button className="text-gray-500 ml-4">Clear All</button>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-500">
                We've found{" "}
                <span className="text-purple-600 font-bold">523</span>jobs!
              </p>
              <p className="flex items-center gap-2 ">
                Sort by:{" "}
                <span className="text-purple-600 font-bold hover:cursor-pointer">
                  Date
                </span>
                <RiArrowDownSLine />
              </p>
            </div>
            {/* cards */}
            <Link
              to={"/"}
              className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-4"
            >
              {/* Icon */}
              <div className="w-full md:w-[10%] flex items-center  justify-start md:justify-center">
                <RiDropboxFill className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
              </div>
              {/* title */}
              <div className="w-full md:w-[70%]">
                <h1 className="text-xl flex items-center gap-2">
                  UX Designer{" "}
                  <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">
                    Remote
                  </span>
                  <span className="text-xs py-1 px-2 bg-green-100 text-green-600 font-bold">
                    Sketch
                  </span>
                </h1>
                <p className="text-gray-500">Dropbox ---- Warzawa</p>
              </div>
              {/* Time*/}
              <div className="w-full md:w-[20%] flex flex-col items-end">
                <h3 className="text-xl text-gray-500 mb-2">8.8 - 13.7k PLN</h3>
                <p className="text-gray-500"> 2 days ago</p>
              </div>
            </Link>
            <Link
              to={"/"}
              className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-4"
            >
              {/* Icon */}
              <div className="w-full md:w-[10%] flex items-center  justify-start md:justify-center">
                <RiTwitchLine className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
              </div>
              {/* title */}
              <div className="w-full md:w-[70%]">
                <h1 className="text-xl flex items-center gap-2">
                  Product Designer{" "}
                  <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">
                    Remote
                  </span>                  
                </h1>
                <p className="text-gray-500">Twitch ---- Wroclaw</p>
              </div>
              {/* Time*/}
              <div className="w-full md:w-[20%] flex flex-col items-end">
                <h3 className="text-xl text-gray-500 mb-2">8.2 - 13.7k PLN</h3>
                <p className="text-gray-500"> 2 days ago</p>
              </div>
            </Link>
            <Link
              to={"/"}
              className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-4"
            >
              {/* Icon */}
              <div className="w-full md:w-[10%] flex items-center  justify-start md:justify-center">
                <RiGoogleLine className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
              </div>
              {/* title */}
              <div className="w-full md:w-[70%]">
                <h1 className="text-xl flex items-center gap-2">
                  UX/UI Designer{" "}
                  <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">
                    Remote
                  </span>
                  <span className="text-xs py-1 px-2 bg-yellow-100 text-yellow-600 font-bold">
                    Javascript
                  </span>
                </h1>
                <p className="text-gray-500">Google ---- Warzawa</p>
              </div>
              {/* Time*/}
              <div className="w-full md:w-[20%] flex flex-col items-end">
                <h3 className="text-xl text-gray-500 mb-2">8.8 - 13.7k PLN</h3>
                <p className="text-gray-500"> 2 days ago</p>
              </div>
            </Link>
            <Link
              to={"/"}
              className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8 w-full drop-shadow-lg border-2 border-transparent hover:border-purple-400 transition-all mb-4"
            >
              {/* Icon */}
              <div className="w-full md:w-[10%] flex items-center  justify-start md:justify-center">
                <RiAmazonLine className="text-7xl bg-purple-100 text-purple-600 p-4 rounded-md" />
              </div>
              {/* title */}
              <div className="w-full md:w-[70%]">
                <h1 className="text-xl flex items-center gap-2">
                  Amazon Designer{" "}
                  <span className="text-xs py-1 px-2 bg-purple-100 text-purple-600 font-bold">
                    Remote
                  </span>
                  <span className="text-xs py-1 px-2 bg-red-100 text-red-600 font-bold">
                    Adobe
                  </span>
                </h1>
                <p className="text-gray-500">Amazon ---- Warzawa</p>
              </div>
              {/* Time*/}
              <div className="w-full md:w-[20%] flex flex-col items-end">
                <h3 className="text-xl text-gray-500 mb-2">8.8 - 13.7k PLN</h3>
                <p className="text-gray-500"> 2 days ago</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
