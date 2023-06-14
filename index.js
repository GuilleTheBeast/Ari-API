const express = require("express");
const app = express();
const xml2js = require("xml2js");

const PORT = 3000; // Puedes cambiar el puerto si lo deseas

app.use(express.json()); // Middleware para analizar JSON en las solicitudes
app.use(express.text()); // Middleware para analizar texto sin formato en las solicitudes

//Convertir de texto a JSON--------------------------------------------------------------------------------
app.post("/txt-json", (req, res) => {
  const { texto } = req.body; // Obtén la cadena de texto del cuerpo de la solicitud

  let jsonResultado;
  try {
    jsonResultado = JSON.parse(texto); // Intenta convertir la cadena de texto a JSON
  } catch (error) {
    return res
      .status(400)
      .json({ error: "La cadena de texto no es un JSON válido" });
  }

  res.json(jsonResultado); // Devuelve el resultado como JSON
});

//Convertir de texto a XML--------------------------------------------------------------------------------
app.post("/txt-xml", (req, res) => {
  const { texto } = req.body; // Obtén la cadena de texto del cuerpo de la solicitud

  let jsonResultado;
  try {
    jsonResultado = JSON.parse(texto); // Intenta convertir la cadena de texto a JSON
  } catch (error) {
    return res
      .status(400)
      .json({ error: "La cadena de texto no es un JSON válido" });
  }

  const builder = new xml2js.Builder();
  const xmlResultado = builder.buildObject(jsonResultado);

  res.type("application/xml").send(xmlResultado); // Devuelve el resultado como XML
});

// Convierte el JSON a TXT ----------------------------------------------------------------------------

app.post("/json-txt", (req, res) => {
  const jsonObject = req.body; // Obtén el objeto JSON del cuerpo de la solicitud

  try {
    const separator = "+"; // Cambia el separador según tus necesidades
    const jsonString = JSON.stringify(jsonObject, null, separator);
    //var textFile = new Blob([jsonString], { type: "text/plain" }); Servira para crear descargable
    res.send(jsonString);
  } catch (error) {
    return res.status(400).json({ error: "El objeto JSON no es válido" });
  }

  // Create a download link or use the FileReader object to save the text file
  //Logica a agregar en el frontend
  /*
var downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(textFile);
downloadLink.download = 'data.txt';
downloadLink.click();
*/
});

// Convierte el XML a TXT ----------------------------------------------------------------------------
app.post("/xml-txt", (req, res) => {
  const xmlString = req.body; // Obtén el XML del cuerpo de la solicitud

  const parser = new xml2js.Parser();

  parser.parseString(xmlString, (err, result) => {
    if (err) {
      return res.status(400).json({ error: "El XML no es válido" });
    }

    const jsonString = JSON.stringify(result); // Convierte el resultado a una cadena de texto
    res.send(jsonString); // Devuelve la cadena de texto como respuesta
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
