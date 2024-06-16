//conectamos

const mongoose = require('mongoose'); //paquete mongoose
const express = require('express');

const app = express(); //creamos la app
const port = 3000;
//arranca el servidor
app.listen(port, () => { console.log(`puerto ${port}`); });

app.use(express.urlencoded({ extended: true }));


// app.use(express.static('htdocs'));

main();

async function main() {
  await mongoose.connect('mongodb+srv://usermm:zLj0Ux2lCmJYeKS1@majadabae.egiyzan.mongodb.net/popup?retryWrites=true&w=majority&appName=MajadaBAE')
  console.log("conectado");

  // Datos de las tablas

  const popupSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    tipoPago: String,
    fecha: Date,
    alquilado: Boolean,
    lugar: String,
    tipo: Array
  });

  const clienteSchema = new mongoose.Schema({
    nombre: String,
    apellidos: String,
    tarifa: Array, //tipo de suscripción, para saber la confianza en el cliente
    contacto: String
  });

  // creamos la colección de las tiendas
  const Tienda = mongoose.model('popups', popupSchema);

  // creamos la colección de los clientes

  const Cliente = mongoose.model('clientes', clienteSchema);

  // metemos los datos en las tablas

  const latienda =
    new Tienda({
      nombre: 'Atletico de altura',
      precio: 500,
      tipoPago: 'mensual',
      fecha: new Date('2024-08-16'),
      alquilado: true,
      lugar: 'C/Toreto, 15',
      tipo: ["edificio con vistas", "planta baja", "almacén", "camión"]
    });

  const losclientes =
    new Cliente({
      nombre: 'Lorenzo',
      apellidos: 'Bermudez Moreno',
      tarifa: [
        { tipo: 'premium', constancia: 'ininterrumpida' }
      ],
      contacto: 'lorenzo@gmail.com'
    });


  // guardamos los datos

  await latienda.save();
  await losclientes.save();
  console.log(latienda.nombre);
  console.log(losclientes.nombre);


  //FIND/SELECT

  app.get('/listatiendas', async (req, res) => {
    let shop = await Tienda.find();
    res.send(shop);
  })



  app.get('/listaclientes', async (req, res) => {
    let cliente = await Cliente.find();
    res.send(cliente);
  })

  // delete

  app.get('/borrartienda/:id', async (req, res) => {
    let borrashop = await Tienda.findByIdAndDelete(req.params.id);
    res.send(borrashop);
  })


  app.get('/borrarcliente/:id', async (req, res) => {
    let borraCliente = await Cliente.findByIdAndDelete(req.params.id);
    res.send(borraCliente + 'Borrado correctamente');
  })




  // insertar

  // datos del formulario
  app.post('/insertatienda', async (req, res) => {
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let tipoPago = req.body.tipoPago;
    let fecha = req.body.fecha;
    let alquilado = req.body.alquilado;
    let lugar = req.body.lugar;
    let tipo = JSON.parse(req.body.tipo);

    // crea la nueva tienda
    const nuevaTienda =
      new Tienda({
        nombre: nombre,
        precio: precio,
        tipoPago: tipoPago,
        fecha: fecha,
        alquilado: alquilado,
        lugar: lugar,
        tipo: tipo
      });
    // guarda los datos
    await nuevaTienda.save();
    // muestra que todo salió bien
    res.send(nuevaTienda.id + ' se ha añadido correctamente');


  });

  app.post('/insertacliente', async (req, res) => {
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let tarifa = JSON.parse(req.body.tarifa);
    let contacto = req.body.contacto;
    // crea nuevo cliente
    const nuevoCliente =
      new Cliente({
        nombre: nombre,
        apellidos: apellidos,
        tarifa: tarifa,
        contacto: contacto,
      });
    // guarda los datos
    await nuevoCliente.save();
    // muestra que todo salió bien
    res.send(nuevoCliente.id + ' se ha añadido correctamente');
  });

  // update

  app.post('/actualizaTienda', async function (req, res) {
    // datos del formulario
    let id = req.body.id;
    let nombre = req.body.nombre;
    let precio = req.body.precio;
    let tipoPago = req.body.tipoPago;
    let fecha = req.body.fecha;
    let alquilado = req.body.alquilado;
    let lugar = req.body.lugar;
    let tipo = req.body.tipo;

    // buscar por id y cambiar datos
    let shop = await Tienda.findByIdAndUpdate(id, {
      nombre: nombre,
      precio: precio,
      tipoPago: tipoPago,
      fecha: fecha,
      alquilado: alquilado,
      lugar: lugar,
      tipo: tipo
    });
    res.send(shop.id + ' se ha actualizado');
  });


  app.post('/actualizaCliente', async function (req, res) {
    // datos del formulario
    let id = req.body.id;
    let nombre = req.body.nombre;
    let apellidos = req.body.apellidos;
    let tarifa = JSON.parse(req.body.tarifa);
    let contacto = req.body.contacto;

    // buscar por id y cambiar datos
    let cliente = await Cliente.findByIdAndUpdate(id, {
      nombre: nombre,
      apellidos: apellidos,
      tarifa: tarifa,
      contacto: contacto,
    });
    res.send(cliente.id + ' se ha actualizado');
  });

  //  const tiendita = await Tienda.find();
  //  console.log(tiendita);
}

