const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 5000;

// Verificar conexión a la base de datos antes de arrancar
db.getConnection()
    .then(connection => {
        console.log('Conexión a la base de datos MySQL establecida correctamente.');
        connection.release();

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
        process.exit(1); // Detener la aplicación si no hay base de datos
    });
