/*
Este script lee un archivo CSV, manipula los datos y escribe los datos manipulados en otro archivo CSV.
27/02 Se agrega funcion para marcar el tiempo de procesamiento.
28/02 Se agrega validacion de cantidad de campos.Muestra en consola el campo que no cumple con 4 campos.
01/03 agregar infome de Productos sin marcas y campos con marcas
*/
const fs = require('fs');
const csv = require('csv-parser');

const inputFile = 'export_men.csv';
const outputFile = 'output.csv';
const logFile = 'log.txt'; // agrega el archivo de log
const startTime = new Date();// Toma una marca de tiempo al comienzo del procesamiento
let stream = null; // Declarar la variable fuera de los eventos y asignarle el valor nulo
let hasError = false; // bandera para indicar si se ha encontrado una fila con más de 4 campos

/*
Configuración para leer el archivo CSV. Usa la opción "mapHeaders" para asignar los nombres de columna correctos a las columnas de entrada del archivo CSV.
*/
const csvReadOptions = {
    separator: ',',
    mapHeaders: ({ header }) => {
      if (header === 'ID') {
        return 'ID';
      } else if (header === 'c__ID') {
        return 'c__ID';
      } else if (header === 'brand') {
        return 'brand';
      } else if (header === 'c__brandName') {
        return 'c__brandName';
      }
    }
  };


// Lee el archivo CSV
fs.createReadStream(inputFile)
  .pipe(csv(csvReadOptions))
  .on('data', (row) => {
    // Verifica que la fila tenga 4 campos
    const keys = Object.keys(row);
    if (keys.length !== 4) {
        console.warn(`Advertencia: fila ${row['_0']},${row['c__brandName']} tiene ${keys.length} campos en lugar de 4`);
        hasError = true; // cambia la bandera a true
        if (stream) stream.destroy(); // verifica que stream tenga un valor antes de llamar a destroy()
    }
    // Manipula los datos
    const valueToWrite = row['c__brandName']; // Obtiene el valor de la columna 1
    if (row['brand']) {
      //console.log(`El campo 'brand' ya tiene un valor: ${row['_0']},${row['brand']}`);
      fs.appendFileSync(logFile, `El campo 'brand' ya tiene un valor: ${row['_0']},${row['brand']}\n`); // Agrega el registro al archivo de log
  } else {
      row['brand'] = valueToWrite; // Escribe el valor en la columna 2
  }
    if (valueToWrite == '') {
      //console.log(`El valor nulo de 'c__brandName' se encuentra en la fila ${row['_0']}`);
      fs.appendFileSync(logFile, `El valor nulo de 'c__brandName' se encuentra en la fila ${row['_0']}\n`); // Agrega el registro al archivo de log
  }
     //console.log(row);
  })
  .on('end', () => {
    if (!hasError) { // si no se encontró ningún error
        console.log('Proceso completado');
        // ...
      } else {
        console.error('Proceso interrumpido debido a un error');
      }
    // Toma una marca de tiempo al final del procesamiento
    const endTime = new Date();
    const processingTime = endTime - startTime; // Calcula la diferencia de tiempo en milisegundos
    console.log(`Proceso completado en ${processingTime} ms`);

    // Escribe los datos manipulados en el archivo de salida CSV
    const stream = fs.createWriteStream(outputFile, { flags: 'a' });
    stream.write('ID,c__ID,brand,c__brandName \n'); // Escribe las cabeceras de las columnas
    fs.createReadStream(inputFile)
      .pipe(csv(csvReadOptions))
      .on('data', (row) => {
       
        if (!hasError){
          stream.write(`${row['_0']},${row['c__ID']},${row['c__brandName']},${row['c__brandName']}\n`); // Escribe los datos manipulados en el archivo de salida CSV
           
        }
 
      })
      .on('end', () => {
        console.log('Datos escritos en el archivo de salida');
      });
  });
