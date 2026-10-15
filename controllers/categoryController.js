const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener categorías' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la categoría' });
    }
};

const createCategory = async (req, res) => {
    try {
        const { nombre, descripcion, parent_id } = req.body;
        if (!nombre || !nombre.trim()) {
            return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }
        const newCategoryId = await Category.create({ nombre: nombre.trim(), descripcion, parent_id });
        res.status(201).json({ message: 'Categoría creada', id: newCategoryId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear categoría' });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { nombre, descripcion, parent_id } = req.body;
        if (!nombre || !nombre.trim()) {
            return res.status(400).json({ message: 'El nombre de la categoría es requerido' });
        }
        const result = await Category.update(req.params.id, { nombre: nombre.trim(), descripcion, parent_id });
        if (result === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json({ message: 'Categoría actualizada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar categoría' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        // Check if category has products
        const productCount = await Category.countProducts(req.params.id);
        if (productCount > 0) {
            return res.status(400).json({ 
                message: `No se puede eliminar: esta categoría tiene ${productCount} producto(s) asociado(s). Mueve o elimina los productos primero.` 
            });
        }
        const result = await Category.delete(req.params.id);
        if (result === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ message: 'No se puede eliminar: tiene subcategorías asociadas. Elimina las subcategorías primero.' });
        }
        res.status(500).json({ message: 'Error al eliminar categoría' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
