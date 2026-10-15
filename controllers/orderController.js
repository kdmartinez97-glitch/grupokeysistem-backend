const Order = require('../models/Order');
const crypto = require('crypto');

const orderController = {
    createOrder: async (req, res) => {
        try {
            const { customer_name, customer_email, customer_phone, total_price, advance_amount, items } = req.body;
            
            if (!customer_name || !customer_email || !customer_phone || !items || items.length === 0) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios y el carrito no puede estar vacío' });
            }

            const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

            const orderData = {
                customer_name,
                customer_email,
                customer_phone,
                total_price: parseFloat(total_price),
                advance_amount: parseFloat(advance_amount),
                items: parsedItems
            };

            const orderId = await Order.create(orderData);

            if (req.file) {
                const receiptUrl = `/uploads/${req.file.filename}`;
                await Order.updateReceipt(orderId, receiptUrl);
            }

            // Enviar correo al administrador y al cliente de forma asíncrona
            const { sendAdminNotification, sendCustomerCheckoutNotification } = require('../utils/emailService');
            sendAdminNotification(orderId, customer_name, parseFloat(total_price).toFixed(2), parseFloat(advance_amount).toFixed(2));
            sendCustomerCheckoutNotification(customer_email, customer_name, orderId, parseFloat(total_price).toFixed(2), parseFloat(advance_amount).toFixed(2));

            res.status(201).json({ message: 'Pedido creado exitosamente', orderId });
        } catch (error) {
            console.error('Error al crear pedido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.findAll();
            res.json(orders);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getOrderById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            res.json(order);
        } catch (error) {
            console.error('Error al obtener pedido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    approveOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            // Generar un PIN aleatorio de 6 dígitos
            const pinCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            const affectedRows = await Order.approve(orderId, pinCode);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }

            // Enviar correo al cliente con el PIN
            const order = await Order.findById(orderId);
            const { sendPinEmail } = require('../utils/emailService');
            if (order) {
                sendPinEmail(order.customer_email, order.customer_name, pinCode, orderId);
            }

            res.json({ message: 'Adelanto aprobado correctamente', pinCode });
        } catch (error) {
            console.error('Error al aprobar pedido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    completeOrder: async (req, res) => {
        try {
            const affectedRows = await Order.complete(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Pedido no encontrado' });
            }
            res.json({ message: 'Pedido marcado como entregado/completado' });
        } catch (error) {
            console.error('Error al completar pedido:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
};

module.exports = orderController;
