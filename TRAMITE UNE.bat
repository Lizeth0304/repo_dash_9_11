@echo off

title Ejecutar Tramite Rectorado

cd D:\6_11_PROYECTO_RECTORADO_CON_BD\ServidorBD
start /B node index.js

cd D:\6_11_PROYECTO_RECTORADO_CON_BD\Proyecto_dash_V2
echo Ejecutando el proyecto frontend...
start /B npm run dev 

cd D:\6_11_PROYECTO_RECTORADO_CON_BD\Backend_Tramite
echo Ejecutando el proyecto backend...
start /B npm run dev 

start http://localhost:5173/
echo Proyecto Iniciado Correctamente.

cd D:\6_11_PROYECTO_RECTORADO_CON_BD\Conversion_pdf
echo Ejecutando el proyecto python...
@echo off
set FLASK_APP=app.py
set FLASK_ENV=production
waitress-serve --port=5000 app:app


