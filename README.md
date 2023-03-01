# replaceBrandname
## Manipulación de datos de archivo CSV con Node.js
Este script lee un archivo CSV, manipula los datos y escribe los datos manipulados en otro archivo CSV.

## Uso
* Clonar el repositorio en tu equipo local.
* Instalar las dependencias con npm install.
* Agregar un archivo CSV de entrada con nombre "export_men.csv" en la carpeta raíz del proyecto.
* Ejecutar el script con node index.js.
* Revisar el archivo CSV de salida con nombre "output.csv" en la carpeta raíz del proyecto.
## Funcionalidades
Lee un archivo CSV con el paquete csv-parser.
Asigna los nombres de columna correctos a las columnas de entrada del archivo CSV con la opción mapHeaders.
Verifica que cada fila tenga 4 campos y muestra una advertencia en la consola si no los tiene.
Manipula los datos de acuerdo a las necesidades del proyecto.
Escribe los datos manipulados en el archivo de salida CSV con el paquete fs.
Agrega las cabeceras de las columnas en el archivo de salida CSV.
Muestra en consola el tiempo que tarda el script en procesar los datos.
## Advertencias
Este script está diseñado para leer y escribir archivos CSV con un formato y estructura específicos. Si el archivo CSV de entrada tiene una estructura diferente, es posible que el script no funcione correctamente.
El script está diseñado para leer y escribir archivos CSV con una codificación de caracteres específica. Si el archivo CSV de entrada tiene una codificación de caracteres diferente, es posible que el script no funcione correctamente.



