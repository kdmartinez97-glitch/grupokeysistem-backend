const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ message: 'Por favor, proporciona correo y contraseña' });
        }

        const user = await User.findByEmail(correo);

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            user: {
                id: user.id,
                rol: user.rol
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1d' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    usuario: {
                        id: user.id,
                        nombre: user.nombre,
                        correo: user.correo,
                        rol: user.rol
                    }
                });
            }
        );
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
};

// Por ahora solo necesitamos login para el admin, 
// el registro podría ser una función protegida solo para admins
const register = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        let user = await User.findByEmail(correo);
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUserId = await User.create({
            nombre,
            correo,
            password: hashedPassword,
            rol
        });

        res.status(201).json({ message: 'Usuario creado exitosamente', userId: newUserId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error en el servidor');
    }
}

module.exports = {
    login,
    register
};
