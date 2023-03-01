# replaceBrandname
Descripción
Este script en Node.js permite leer un archivo CSV, manipular los datos y escribir los datos manipulados en otro archivo CSV. Además, incluye la funcionalidad de marcar el tiempo de procesamiento y validar la cantidad de campos por fila.

Instalación
Antes de usar este script, es necesario tener instalado Node.js en su computadora y luego instalar las dependencias necesarias que se especifican en el archivo package.json. Para instalar las dependencias, simplemente ejecute el siguiente comando en la línea de comandos:
npm install
Uso
Para usar este script, simplemente debe proporcionar los nombres de archivo de entrada y salida en las variables inputFile y outputFile, respectivamente. 
Luego, ejecute el script en la línea de comandos con el siguiente comando:
node script.js
El script leerá el archivo de entrada, manipulará los datos y escribirá los datos manipulados en el archivo de salida. También mostrará en la consola la cantidad de tiempo que tardó el proceso y una advertencia en caso de que una fila tenga más de 4 campos.
Información adicional
Este script también incluye comentarios en el código para explicar su funcionalidad en detalle. Además, al finalizar el proceso, el archivo de salida incluirá las cabeceras de las columnas, seguidas de los datos manipulados. Si alguna fila contiene más de 4 campos, se detendrá el proceso y se mostrará un mensaje de error en la consola.

Este script es útil para manipular grandes cantidades de datos en formato CSV de manera automatizada, lo que puede ahorrar tiempo y reducir errores en el proceso de manipulación de datos.