require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('./models/User');

async function create() {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('grupokeysistem12', salt);
        const id = await User.create({
            nombre: 'Administrador Principal',
            correo: 'grupoKeysistem.admon@gmail.com',
            password: hashedPassword,
            rol: 'admin'
        });
        console.log("Usuario admin creado exitosamente con ID: " + id);
    } catch (e) {
        console.error("Error: ", e);
    }
    process.exit(0);
}
create();

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash('grupokeysistem12', salt);