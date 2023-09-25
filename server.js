const express = require('./node_modules/express');
const bodyParser = require('./node_modules/body-parser');
const mysql = require('./node_modules/mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'contraseña',
  database: 'mi_base_de_datos'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.post('/guardar', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  const nuevoProducto = { nombre, descripcion, precio };

  db.query('INSERT INTO productos SET ?', nuevoProducto, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Nuevo producto agregado:', result);
    res.send('Producto guardado con éxito');
  });
});

app.listen(4000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});