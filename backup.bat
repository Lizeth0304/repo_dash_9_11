@echo off
setlocal enabledelayedexpansion
for /f "tokens=1-4 delims=/ " %%a in ('date /t') do (
    set TIMESTAMP=%%d%%b%%c
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set TIMESTAMP=!TIMESTAMP!%%a%%b
)
set DB_USER=root
set DB_PASS=
set DB_NAME=tramite_une
set BACKUP_DIR=D:\6_11_PROYECTO_RECTORADO_CON_BD\backup

rem Crear un archivo de opciones temporales para la contraseña
echo [client] > %TEMP%\mysql-options.cnf
echo password=!DB_PASS! >> %TEMP%\mysql-options.cnf

rem Ejecutar mysqldump utilizando el archivo de opciones para la contraseña
mysqldump --defaults-file=%TEMP%\mysql-options.cnf -u %DB_USER% %DB_NAME% > %BACKUP_DIR%\%DB_NAME%_!TIMESTAMP!.sql

rem Eliminar el archivo de opciones temporales
del %TEMP%\mysql-options.cnf

rem Informar que la copia de seguridad ha sido completada

rem Cierre automático
exit /b
