import React from "react";
import Enviar from "../../components/Enviar";

const Correo = () => {
  return (
    <>
      <div>
        {/* Titulo para Encabezado */}
        <div className="mb-6 p-2 md:p-8 lg:12 bg-lime-200 ">
          <h1 className="text-3xl font-bold">Correo</h1>
        </div>

        {/* Parte del Contenedor */}
        <div>
          <Enviar/>
        </div>
      </div>
    </>
  );
};

export default Correo;
