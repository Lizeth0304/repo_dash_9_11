import React, { useState } from "react";
import { Rings, TailSpin } from "react-loader-spinner";
import emailService from "../services/emailService";
import centrosDeCosto from "./data.json";
import Swal from "sweetalert2";

const Enviar = () => {
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState({
    centroCosto: "",
    para: "",
    titulo: "",
    mensaje: "",
    documento: "",
    numeroHojaEnvio: "",
    mensajePersonalizado: "",
    fileAdjunto: [],
  });

  // Cargar datos de los centros de costo desde el archivo JSON
  const centrosDeCostoData = centrosDeCosto.centrosDeCosto;
  const handleDocumentoChange = (e) => {
    setEmailData({
      ...emailData,
      documento: e.target.value,
    });
  };
  const handleMensajeChange = (e) => {
    setEmailData({
      ...emailData,
      mensajePersonalizado: e.target.value,
    });
  };
  const handleCentroCostoChange = (e) => {
    const centroCosto = e.target.value;

    // Si se selecciona un "Centro de Costo" de la lista, se autocompletan los campos de correo y mensaje

    setEmailData({
      ...emailData,
      centroCosto,
      para: centrosDeCostoData[centroCosto]?.correo || "",
      mensaje: centrosDeCostoData[centroCosto]?.mensaje || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Cambiar el estado para mostrar la animación de carga
    try {
      const formData = new FormData();
      formData.append("para", emailData.para);
      formData.append("titulo", emailData.titulo);
      formData.append(
        "mensaje",
        `${emailData.mensaje}<br><br>
        ${emailData.documento === 'Otros' ? `${emailData.mensajePersonalizado} N° ${emailData.numeroHojaEnvio}-2023-R-UNE` : `${emailData.documento} N° ${emailData.numeroHojaEnvio}-2023-R-UNE`}<br><br>`); // Concatenar el número de Hoja de Envío al mensaje
      formData.append("numeroHojaEnvio", emailData.numeroHojaEnvio); // Agregar el número de Hoja de Envío al FormData

      // Agregar archivos al formData
      for (let i = 0; i < emailData.fileAdjunto.length; i++) {
        formData.append("fileAdjunto", emailData.fileAdjunto[i]);
      }

      const response = await emailService.sendEmail(formData);
      console.log("Correo enviado:", response);
      // Lógica adicional después de enviar el correo, como mostrar una notificación de éxito, etc.
      setLoading(false); // Cambiar el estado para mostrar la animación de carga

      // Mostrar el SweetAlert2 de éxito
      Swal.fire({
        icon: "success",
        title: "¡Correo enviado!",
        text: "El correo se envió correctamente.",
      });

      // Limpiar los campos del formulario
      setEmailData({
        centroCosto: "",
        para: "",
        titulo: "",
        mensaje: "",
        documento: "",
        numeroHojaEnvio: "",
        mensajePersonalizado: "",
        fileAdjunto: [],
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setLoading(false); // Cambiar el estado de caso de error

      // Lógica adicional para manejar el error, como mostrar una notificación de error, etc.
      // Mostrar SweetAlert2 de error si hay un error al enviar el correo
      Swal.fire({
        icon: "error",
        title: "Error al enviar el correo",
        text: "Hubo un error al enviar el correo electrónico. Por favor, inténtalo nuevamente.",
      });
    }
  };

  console.log(Enviar);

  return (
    <div className="">
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-10 flex flex-row">
            <label
              htmlFor="countries"
              className="flex basis-1/4 place-items-center justify-end pr-10 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Centro de Costo:
            </label>
            <select
              id=""
              name="centrocosto"
              value={emailData.centroCosto}
              onChange={handleCentroCostoChange}
              className="bg-gray-50 border w-[50%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            >
              <option value="">Elige un centro de costo</option>

              <option value="comision_fiscalizacion">Comisión Permanente de Fiscalización</option>
              <option value="defensor_universitario">Defensa Universitaria</option>
              <option value="oficina_asesoria">Oficina de Asesoría Legal</option>
              <option value="oficina_planeamiento">Oficina de Planeamiento Estratégico y Presupuesto</option>
              <option value="organo_control">Órgano de Control Institucional</option>
              <option value="tribunal_honor">Tribunal de Honor</option>
              <option value="unidad_organizacion">Unidad de Organización y Procesos</option>
              <option value="unidad_planeamiento">Unidad de Planeamiento</option>
              <option value="unidad_presupuesto">Unidad de Presupuesto</option>
              <option value="unidad_rectorado">Unidad del Rectorado</option>
              <option value="unidad_vicerrectorado_academico">
                Unidad de Vicerrectorado Academico
              </option>
              <option value="unidad_vicerrectorado_investigacion">
                Unidad de Vicerrectorado de Investigación
              </option>
              <option value="vicerrectorado_academico">
                Vicerrectorado Academico
              </option>
              <option value="vicerrectorado_de_investigacion">
                Vicerrectorado De Investigacion
              </option>





              <option value="escuela_de_posgrado">Escuela de Posgrado</option>
              <option value="facultad_ciencias_sociales">
                Facultad de Ciencias Sociales
              </option>
              <option value="secretaria_general">Secretaria General</option>
              <option value="prueba">Prueba de correo</option>
              {/* Agrega más centros de costo aquí */}
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Si se selecciona un "Centro de Costo", se muestra el campo de correo autocompletado */}
          {emailData.centroCosto !== "otro" && (
            <div className="mt-10 flex flex-row">
              <label
                htmlFor="correo"
                className="flex basis-1/4 place-items-center justify-end pr-10 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={emailData.para}
                readOnly // Hacemos el campo de correo no editable
                className="bg-gray-50 border w-[50%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="centro_costo@une.edu.pe"
              />
            </div>
          )}

          {emailData.centroCosto === "otro" && (
            <div className="mt-10 flex flex-row">
              <label
                htmlFor="correo"
                className="flex basis-1/4 place-items-center justify-end pr-10 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={emailData.para}
                onChange={(e) =>
                  setEmailData({ ...emailData, para: e.target.value })
                }
                className="bg-gray-50 border w-[50%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="otro_correo@une.edu.pe"
              />
            </div>
          )}

          <div className="mt-10 flex flex-row ">
            <label
              htmlFor="asunto"
              className="flex basis-1/4 place-items-center justify-end pr-10 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Asunto:
            </label>
            <input
              type="text"
              id="asunto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Asunto"
              required
              value={emailData.titulo}
              onChange={(e) =>
                setEmailData({ ...emailData, titulo: e.target.value })
              }
            />
          </div>

          <div className="mt-10 flex flex-row justify-center">
            <label
              htmlFor="documento"
              className="flex  place-items-center mr-10 mb-2  text-sm font-medium text-gray-900 dark:text-white"
            >
              Documento:
            </label>
            <select
              id="documento"
              name="documento"
              value={emailData.documento}
              onChange={handleDocumentoChange}
              className={`${
                emailData.documento === "Otros" ? "w-[8%]" : "w-[15%]"
              } bg-gray-50 border mr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            >
              <option value="">Elige un tipo de documento</option>
              <option value="Hoja de Tramite">Hoja de Tramite</option>
              <option value="Hoja de Envio">Hoja de Envio</option>
              <option value="Memorandum">Memorandum</option>
              <option value="Otros">Otros</option>
            </select>

            {emailData.documento === "Otros" && (
              <div className="flex flex-row justify-center items-center">
                <label
                  htmlFor="documento"
                  className="flex  place-items-center justify-end pr-10 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Especifique:
                </label>
                <input
                  type="text"
                  id="mensajePersonalizado"
                  name="mensajePersonalizado"
                  value={emailData.mensajePersonalizado}
                  onChange={handleMensajeChange}
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            )}

            <label
              htmlFor="numeroHojaEnvio"
              className="flex place-items-center justify-end pr-10 mb-2 ml-5 text-sm font-medium text-gray-900 dark:text-white"
            >
              N°:
            </label>
            <input
              type="text"
              id="numeroHojaEnvio"
              name="numeroHojaEnvio"
              value={emailData.numeroHojaEnvio}
              onChange={(e) =>
                setEmailData({ ...emailData, numeroHojaEnvio: e.target.value })
              }
              className="bg-gray-50 border w-[8%] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Número de Hoja de Envío"
            />
          </div>
          <div className="mt-10 flex flex-row">
            <label
              htmlFor="message"
              className="flex basis-1/4 place-items-center justify-end pr-10  mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contenido:
            </label>
            <textarea
              id="message"
              rows="8"
              className="block p-2.5 w-[50%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escribe tu contenido aquí..."
              value={emailData.mensaje}
              onChange={(e) =>
                setEmailData({ ...emailData, mensaje: e.target.value })
              }
            />
          </div>

          <div className="mt-10 flex flex-row">
            <label
              className="flex basis-1/4 place-items-center justify-end pr-10 mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="multiple_files"
            >
              Adjuntar Archivos:
            </label>
            <input
              className="block w-[50%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="multiple_files"
              name="fileAdjunto"
              type="file"
              multiple
              onChange={(e) =>
                setEmailData({ ...emailData, fileAdjunto: e.target.files })
              }
            />
          </div>

          <div className="flex basis-1/4 justify-center pr-100 mt-10">
            <button
              type="submit"
              disabled={loading}
              className="  text-white flex flex-row place-items-center bg-gradient-to-br from-green-400 mt-10 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {loading && (
                <div className="lds-spinner-container mr-10 ">
                  <TailSpin
                    type="Oval" // Puedes cambiar el tipo de spinner si prefieres otro estilo
                    color="#00BFFF" // Puedes cambiar el color del spinner
                    height={40} // Puedes ajustar el tamaño del spinner
                    width={40}
                  />
                </div>
              )}{" "}
              Enviar Correo
            </button>
          </div>
        </form>
        {/* Muestra el spinner de carga si loading es true */}
        {/* Muestra el spinner de carga si loading es true */}
      </div>
    </div>
  );
};

export default Enviar;
