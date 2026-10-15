const Contact = require('../models/Contact');
const { sendContactNotification } = require('../utils/mailer');

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener mensajes de contacto' });
    }
};

const createContact = async (req, res) => {
    try {
        const { nombre, correo, telefono, mensaje } = req.body;
        const newContactId = await Contact.create({ nombre, correo, telefono, mensaje });
        
        // Intentar enviar el correo de notificación en segundo plano
        // No esperamos con await forzosamente para no trabar la respuesta al usuario, o sí esperamos si queremos asegurar.
        // Esperaremos para saber si falla, pero devolveremos 201 de todos modos porque en BD ya se guardó.
        sendContactNotification({ nombre, correo, telefono, mensaje }).catch(console.error);

        res.status(201).json({ message: 'Mensaje enviado exitosamente', id: newContactId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al enviar mensaje' });
    }
};

const updateContactStatus = async (req, res) => {
    try {
        const { estado } = req.body;
        const result = await Contact.updateStatus(req.params.id, estado);
        if (result === 0) return res.status(404).json({ message: 'Mensaje no encontrado' });
        res.json({ message: 'Estado del mensaje actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar estado del mensaje' });
    }
};

const deleteContact = async (req, res) => {
    try {
        const result = await Contact.delete(req.params.id);
        if (result === 0) return res.status(404).json({ message: 'Mensaje no encontrado' });
        res.json({ message: 'Mensaje eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar mensaje' });
    }
};

module.exports = {
    getAllContacts,
    createContact,
    updateContactStatus,
    deleteContact
};
