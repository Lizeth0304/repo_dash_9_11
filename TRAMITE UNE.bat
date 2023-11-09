@echo off
title Ejecutar Tramite Rectorado

cd D:\Proyecto_dash_V2
echo Ejecutando el proyecto frontend...
start /B npm run dev 

cd D:\CODIGO_UNE\Backend_Tramite
echo Ejecutando el proyecto backend...
start /B npm run dev 

start http://localhost:5173/
echo Proyecto Iniciado Correctamente.

cd D:\Conversion_pdf
echo Ejecutando el proyecto python...
@echo off
set FLASK_APP=app.py
set FLASK_ENV=production
waitress-serve --port=5000 app:app