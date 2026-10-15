const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

const createProduct = async (req, res) => {
    try {
        let { nombre, clave, descripcion, precio, stock, categoria_id, marca, estado } = req.body;
        
        if (typeof precio === 'string') precio = precio.replace(',', '.');
        categoria_id = categoria_id === '' ? null : categoria_id;

        let imagen_url = req.body.imagen_url || null; // Si se manda como string (URL externa)
        let imagenesArr = [];
        
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                imagenesArr.push(`/uploads/${file.filename}`);
            });
        }
        
        if (imagenesArr.length > 0 && !imagen_url) {
            imagen_url = imagenesArr[0]; // fallback
        }
        
        const imagenes = JSON.stringify(imagenesArr);

        const newProductId = await Product.create({
            nombre, clave, descripcion, precio, stock, categoria_id, marca, imagen_url, imagenes, estado
        });

        res.status(201).json({ message: 'Producto creado exitosamente', id: newProductId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

        let { nombre, clave, descripcion, precio, stock, categoria_id, marca, estado } = req.body;
        
        if (typeof precio === 'string') precio = precio.replace(',', '.');
        categoria_id = categoria_id === '' ? null : categoria_id;
        
        let imagen_url = req.body.imagen_url !== undefined ? req.body.imagen_url : product.imagen_url;
        
        // Manejar imagenes_existentes enviadas desde el frontend
        let imagenesArr = [];
        if (req.body.imagenes_existentes) {
            try {
                imagenesArr = JSON.parse(req.body.imagenes_existentes);
            } catch (e) {
                if (typeof req.body.imagenes_existentes === 'string') {
                    imagenesArr = [req.body.imagenes_existentes];
                }
            }
        } else if (product.imagenes) {
             try {
                imagenesArr = JSON.parse(product.imagenes);
             } catch(e) {}
        }
        
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                imagenesArr.push(`/uploads/${file.filename}`);
            });
        }
        
        if (imagenesArr.length > 0) {
            imagen_url = imagenesArr[0]; // update fallback
        } else if (imagenesArr.length === 0) {
            imagen_url = null;
        }

        const imagenes = JSON.stringify(imagenesArr);

        await Product.update(req.params.id, {
            nombre: nombre || product.nombre,
            clave: clave !== undefined ? clave : product.clave,
            descripcion: descripcion || product.descripcion,
            precio: precio || product.precio,
            stock: stock || product.stock,
            categoria_id: categoria_id || product.categoria_id,
            marca: marca || product.marca,
            imagen_url,
            imagenes,
            estado: estado || product.estado
        });

        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const result = await Product.delete(req.params.id);
        if (result === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
