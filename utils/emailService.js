const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendAdminNotification = async (orderId, customerName, total, advance) => {
    try {
        const mailOptions = {
            from: `"Grupo Keysistem" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `🚨 Nuevo Apartado Recibido #${orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #004e98; text-align: center;">¡Nuevo Apartado Recibido!</h2>
                    <p>Hola Administrador,</p>
                    <p>El cliente <strong>${customerName}</strong> ha realizado un nuevo apartado en la tienda.</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>ID de Pedido:</strong> #${orderId}</p>
                        <p style="margin: 5px 0;"><strong>Total del Pedido:</strong> $${total}</p>
                        <p style="margin: 5px 0;"><strong>Adelanto a Verificar:</strong> $${advance} (30%)</p>
                    </div>
                    <p>Por favor, ingresa al panel de administración para verificar el comprobante de transferencia y aprobar el pedido. Al aprobarlo, el cliente recibirá automáticamente su código PIN secreto.</p>
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:5173/admin/pedidos" style="background-color: #004e98; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Ir al Panel de Administración</a>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo de notificación al administrador enviado exitosamente.');
    } catch (error) {
        console.error('Error enviando correo al administrador:', error);
    }
};

const sendPinEmail = async (customerEmail, customerName, pinCode, orderId) => {
    try {
        const mailOptions = {
            from: `"Grupo Keysistem" <${process.env.EMAIL_USER}>`,
            to: customerEmail,
            subject: `✅ Tu Apartado #${orderId} ha sido Aprobado`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #004e98; text-align: center;">¡Tu apartado ha sido aprobado!</h2>
                    <p>Hola <strong>${customerName}</strong>,</p>
                    <p>Hemos verificado exitosamente tu pago de adelanto. Tu producto está reservado y seguro con nosotros.</p>
                    <div style="background-color: #e6f2ff; padding: 20px; border-radius: 8px; margin: 25px 0; text-align: center; border: 1px solid #b3d4ff;">
                        <p style="margin: 0; color: #333; font-size: 14px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Tu Código PIN Secreto</p>
                        <p style="margin: 10px 0 0 0; color: #004e98; font-size: 32px; font-weight: 900; letter-spacing: 4px;">${pinCode}</p>
                    </div>
                    <p><strong>¿Qué sigue?</strong></p>
                    <p>Para recoger tu producto, por favor acude a nuestra sucursal. <strong>Deberás mostrar este código PIN en mostrador</strong> y realizar el pago del 70% restante.</p>
                    <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
                        Por tu seguridad, no compartas este código con nadie. Este código es único e irrepetible para tu pedido #${orderId}.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo con PIN enviado al cliente exitosamente.');
    } catch (error) {
        console.error('Error enviando correo al cliente:', error);
    }
};

const sendCustomerCheckoutNotification = async (customerEmail, customerName, orderId, total, advance) => {
    try {
        const mailOptions = {
            from: `"Grupo Keysistem" <${process.env.EMAIL_USER}>`,
            to: customerEmail,
            subject: `📝 Hemos recibido tu apartado #${orderId}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #004e98; text-align: center;">¡Recibimos tu solicitud de apartado!</h2>
                    <p>Hola <strong>${customerName}</strong>,</p>
                    <p>Hemos recibido correctamente tu solicitud de apartado y tu comprobante de pago.</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>ID de Pedido:</strong> #${orderId}</p>
                        <p style="margin: 5px 0;"><strong>Total del Pedido:</strong> $${total}</p>
                        <p style="margin: 5px 0;"><strong>Adelanto a Verificar:</strong> $${advance} (30%)</p>
                    </div>
                    <p>Nuestro equipo revisará tu comprobante en breve. Una vez validado, te enviaremos otro correo con tu <strong>Código PIN secreto</strong> para recoger el producto en sucursal.</p>
                    <p>Gracias por tu compra en Grupo Keysistem.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Correo de confirmación de checkout enviado al cliente exitosamente.');
    } catch (error) {
        console.error('Error enviando correo de confirmación al cliente:', error);
    }
};

module.exports = {
    sendAdminNotification,
    sendPinEmail,
    sendCustomerCheckoutNotification
};
