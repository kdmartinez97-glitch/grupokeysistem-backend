const db = require('../config/db');

async function createOrdersTables() {
    try {
        const createOrdersTable = `
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                customer_phone VARCHAR(50) NOT NULL,
                total_price DECIMAL(10, 2) NOT NULL,
                advance_amount DECIMAL(10, 2) NOT NULL,
                status ENUM('pending', 'approved', 'completed', 'cancelled') DEFAULT 'pending',
                receipt_url VARCHAR(255),
                pin_code VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;

        const createOrderItemsTable = `
            CREATE TABLE IF NOT EXISTS order_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES productos(id) ON DELETE CASCADE
            )
        `;

        console.log('Creando tabla orders...');
        await db.query(createOrdersTable);
        
        console.log('Creando tabla order_items...');
        await db.query(createOrderItemsTable);

        console.log('Tablas creadas correctamente.');
    } catch (error) {
        console.error('Error creando tablas:', error);
    } finally {
        process.exit();
    }
}

createOrdersTables();
