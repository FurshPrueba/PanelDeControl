const path = require('path');

// Función para determinar el tipo de contenido basado en la extensión del archivo
function getContentType(rutaActualCliente) {
    const extname = path.extname(rutaActualCliente);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        default:
            return 'application/octet-stream';
    }
};

module.exports = {
    contenidoServer : getContentType
}