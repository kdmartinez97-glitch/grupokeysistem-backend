const Service = require('../models/Service');

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener servicios' });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener servicio' });
    }
};

const createService = async (req, res) => {
    try {
        const newServiceId = await Service.create(req.body);
        res.status(201).json({ message: 'Servicio creado exitosamente', id: newServiceId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear servicio' });
    }
};

const updateService = async (req, res) => {
    try {
        const updated = await Service.update(req.params.id, req.body);
        if (updated === 0) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json({ message: 'Servicio actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar servicio' });
    }
};

const deleteService = async (req, res) => {
    try {
        const deleted = await Service.delete(req.params.id);
        if (deleted === 0) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.json({ message: 'Servicio eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar servicio' });
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};
