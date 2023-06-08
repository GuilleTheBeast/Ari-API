const express = require('express');
const app = express();
const xml2js = require('xml2js');

const PORT = 8080; // Puedes cambiar el puerto si lo deseas

app.use(express.text); // Middleware para analizar JSON en las solicitudes

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.post('/cadena', (req, res) => {
  const { texto } = req.body; // Obtén la cadena de texto del cuerpo de la solicitud

  /*
  let jsonResultado;
  try {
    jsonResultado = JSON.parse(texto); // Intenta convertir la cadena de texto a JSON
  } catch (error) {
    return res.status(400).json({ error: 'La cadena de texto no es un JSON válido' });
  }

  res.json(jsonResultado); // Devuelve el resultado como JSON
});
*/

let jsonResultado;
  try {
    jsonResultado = JSON.parse(texto); // Intenta convertir la cadena de texto a JSON
  } catch (error) {
    return res.status(400).json({ error: 'La cadena de texto no es un JSON válido' });
  }

  // Convierte el JSON a XML utilizando xml2js
  const builder = new xml2js.Builder();
  const xmlResultado = builder.buildObject(jsonResultado);

  res.type('application/xml').send(xmlResultado); // Devuelve el resultado como XML
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});