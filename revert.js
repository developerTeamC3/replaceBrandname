const fs = require('fs');
const csvParser = require('csv-parser');

const inputCsvFile = 'export2.csv';
const outputXmlFile = 'output.xml';

const readStream = fs.createReadStream(inputCsvFile);
const writeStream = fs.createWriteStream(outputXmlFile);

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

writeStream.write('<?xml version="1.0" encoding="UTF-8"?>\n');
writeStream.write('<catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="palacio-master-catalog">\n');

readStream
  .pipe(csvParser(csvReadOptions))
  .on('data', (row) => {
    const keys = Object.keys(row);
    
    if (row['c__brandName']) {
      writeStream.write(`  <product product-id="${row['_0']}">\n`);
      writeStream.write(`    <brand></brand>\n`);
      writeStream.write('  </product>\n');
    }
  })
  .on('end', () => {
    writeStream.write('</catalog>');
    writeStream.end();
    console.log('CSV to XML conversion completed successfully.');
  })
  .on('error', (err) => {
    console.error('Error during CSV to XML conversion:', err);
  });
