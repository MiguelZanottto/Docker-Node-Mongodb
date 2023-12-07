const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://admin:admin123@mongo-db:27017/despliegue?authSource=admin',{
});

const SchemaData = new mongoose.Schema({
    nombre: String,
  });

const Usuario = mongoose.model("Usuario", SchemaData);

app.use(express.static("web"));

app.post("/guardar", async (req, res) => {
    try{
        const {nombre} = req.body;
        const nuevoNombre = new Usuario({nombre});
        await nuevoNombre.save();
        res.status(200).send('El nombre ' + nuevoNombre.nombre + ' ha sido guardado correctamente');
    } catch(error){
        console.log(error);
        res.status(500).send("Error al guardar el nombre");
    }
});

app.get("/obtener", async (req, res) => {
    try{
        const nombres = await Usuario.find({}, 'nombre');
        const arrayNombres = nombres.map(usuario => usuario.nombre);
        if(arrayNombres.length == 0){
            res.send("No hay ningun nombre guardado")
        } else {
            res.status(200).send(arrayNombres);
        }
    } catch(error) {
        console.error(error);
        res.status(500).send("Error al obtener los nombres");
    }
});

app.get("/buscar", async (req, res) => {
    try{
        const nombreEspecifico = req.query.nombreEspecifico;
        const usuarioEncontrado = await Usuario.findOne({nombre: nombreEspecifico})
        if(usuarioEncontrado){
            var nombre = usuarioEncontrado.nombre;
            res.send(nombre);
        } else {
            res.status(404).send("El nombre " + nombreEspecifico + " no existe en la BD");
        }
    } catch(erro){
        console.log(error);
        res.status(500).send("Error al buscar el nombre");
    }
});


app.listen(port, () => {
    console.log("Servidor escuchando en el puerto: " + port)
})