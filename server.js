const express = require('./node_modules/express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware para parsear el cuerpo de las solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar la conexiooon con la base de datos
const db = new sqlite3.Database('./panel.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

//Seleccionar la carpeta public como la que tiene documentos estaticos
app.use(express.static('public'));


//enrutamiento

//Inicial
app.get('/', (req,res)=>{
  res.sendFile(__dirname +'/public/index.html');
})

//Menus
app.get('/menus', (req,res)=>{
  res.sendFile(__dirname +'/public/menu.html');
})

//Productos
app.get('/productos', (req, res) => { // Corregido de /procuctos a /productos
  res.sendFile(__dirname + '/public/productos.html');
});

//Acceder
app.get('/productos', (req, res) => { // Corregido de /procuctos a /productos
  res.sendFile(__dirname + '/public/productos.html');
});


//Pagina de error
app.use((req, res)=>{
  res.sendFile(__dirname +'/public/404.html');
});

app.post('/porcesarnuevoproducto', (req, res)=>{
  const {Nombre, Descripcion, Imagen, precio} = req.body;

  const peticion = 'INSERT INTO Productos (Nombre, Descripcion, Imagen, Precio) VALUES (?, ?, ?, ?)'
  
  db.run(peticion, [Nombre, Descripcion, Imagen , precio], (err)=>{
    if(err){
      console.log("A ocurrido un error en la base de datos");
    }else{

    }
  });
});

app.post('/porcesarlogin', (req, res)=>{
  const {contraseña, dominio} = req.body;

  const peticion = 'SELECT Dominio, Contraseña FROM Usuarios'
  
  db.run(peticion, [Nombre, Descripcion, Imagen , precio], (err)=>{
    if(err){
      console.log("A ocurrido un error en la base de datos");
    }else{
      
    }
  });
});

app.listen(4000, () => {
  console.log('Servidor en ejecución en el puerto 4000');
});