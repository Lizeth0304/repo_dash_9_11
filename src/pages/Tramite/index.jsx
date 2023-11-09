import ModeloA from "../../components/ModeloA";
import ModeloB from "../../components/ModeloB";
import Modificar from "../../components/Modificar";
import Datos from "../../components/Datos";
import ModificarP from "../../components/ModificarP";
import { useState } from "react";
import { RiArticleLine, RiArticleFill, RiDraftLine } from "react-icons/ri";

function Tramite() {
  
     const [botones, setBotones] = useState("ModeloA");

     const handleBotonesChange = (boton) => {
      setBotones(boton);
     }
  
     return (
      <>
       <div className="">
        <div className="mb-6 p-2 md:p-8 w-full lg:12 bg-lime-200">
           <h1 className="text-3xl font-bold">Tramite</h1>
         </div>
           {/* Esto es mi bloque 1 */}
           <div className="">
          <div className="w-full p-6 bg-blue-100">
            <div className="inline-flex rounded-md shadow-sm mb-10 ml-20" role="group">
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  botones === "ModeloA"
                    ? "text-blue-700 bg-gray-100"
                    : "text-gray-900 bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleBotonesChange("ModeloA")}
              >
                <RiArticleLine className="mr-2" />
               Hoja de Envío
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  botones === "ModeloB"
                    ? "text-blue-700 bg-gray-100"
                    : "text-gray-900 bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleBotonesChange("ModeloB")}
              >
                <RiArticleFill className="mr-2"/>
                Hoja de Tramite
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  botones === "Modificar"
                    ? "text-blue-700 bg-gray-100"
                    : "text-gray-900 bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleBotonesChange("Modificar")}
              >
                <RiDraftLine className="mr-2"/>
                Modificar Foliado
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-4 py-2 text-sm font-medium ${
                  botones === "ModificarP"
                    ? "text-blue-700 bg-gray-100"
                    : "text-gray-900 bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleBotonesChange("ModificarP")}
              >
                <RiDraftLine className="mr-2"/>
                Modificar Proveído
              </button>

            </div>

            {botones === "ModeloA" && <ModeloA />}
            {botones === "ModeloB" && <ModeloB />}
            {botones === "Modificar" && <Modificar />}
            {botones === "ModificarP" && <ModificarP />}
           
            
          </div>
        </div>        
      </div>
      </>
     )
  // const [isChecked, setIsChecked] = useState(true);

  // const handleToggle = () => {
  //   setIsChecked((prevState) => !prevState);
  // };

  // return (
  //   <>
  //     <div className="">
  //       <div className="mb-6 p-2 md:p-8 lg:12 bg-gray-100 ">
  //         <h1 className="text-3xl font-bold">Tramite</h1>
  //       </div>
  //       <div className="">
  //         {/* Esto es mi bloque 1 */}

  //         <div className="w-full p-6 bg-gray-100">
  //           <label className="relative inline-flex items-center cursor-pointer">
  //             <input
  //               type="checkbox"
  //               value={isChecked}
  //               className="sr-only peer"
  //               onChange={handleToggle}
  //             />
  //             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  //             <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
  //               {isChecked ? "Hoja de Envío" : "Hoja de Trámite"}
  //             </span>
  //           </label>

  //           {isChecked ? <ModeloA /> : <ModeloB />}
  //           {/* <h3 className="italic"><span className="hover:cursor-pointer font-bold text-blue-500">Click </span>Modelo A</h3>
  //           <ModeloA />

  //           <h3 className="mt-20 italic"><span className="hover:cursor-pointer font-bold text-blue-500">Click </span>Modelo B</h3>
  //           <ModeloB /> */}
  //         </div>
  //         {/* Aqui visualizador */}
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Tramite;
