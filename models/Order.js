const db = require('../config/db');

const Order = {
    create: async (orderData) => {
        const { customer_name, customer_email, customer_phone, total_price, advance_amount, items } = orderData;
        const connection = await db.getConnection();
        
        try {
            await connection.beginTransaction();

            const [orderResult] = await connection.execute(
                'INSERT INTO orders (customer_name, customer_email, customer_phone, total_price, advance_amount) VALUES (?, ?, ?, ?, ?)',
                [customer_name, customer_email, customer_phone, total_price, advance_amount]
            );
            
            const orderId = orderResult.insertId;

            for (let item of items) {
                await connection.execute(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.product_id, item.quantity, item.precio]
                );
            }

            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    },
    
    updateReceipt: async (orderId, receiptUrl) => {
        const [result] = await db.execute(
            'UPDATE orders SET receipt_url = ? WHERE id = ?',
            [receiptUrl, orderId]
        );
        return result.affectedRows;
    },

    approve: async (orderId, pinCode) => {
        const [result] = await db.execute(
            'UPDATE orders SET status = "approved", pin_code = ? WHERE id = ?',
            [pinCode, orderId]
        );
        return result.affectedRows;
    },

    complete: async (orderId) => {
        const [result] = await db.execute(
            'UPDATE orders SET status = "completed" WHERE id = ?',
            [orderId]
        );
        return result.affectedRows;
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM orders ORDER BY created_at DESC');
        return rows;
    },

    findById: async (id) => {
        const [orderRows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
        if (orderRows.length === 0) return null;

        const order = orderRows[0];
        const [itemsRows] = await db.execute(`
            SELECT oi.*, p.nombre as product_name, p.imagen_url as product_image
            FROM order_items oi
            JOIN productos p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `, [id]);

        order.items = itemsRows;
        return order;
    }
};

module.exports = Order;
