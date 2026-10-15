const nodemailer = require('nodemailer');

// Configuración del transporter usando las variables de entorno
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/**
 * Función para enviar el correo de notificación cuando alguien llena el formulario
 * @param {Object} contactData - Los datos del formulario de contacto
 */
const sendContactNotification = async (contactData) => {
    try {
        const { nombre, correo, telefono, mensaje } = contactData;
        const emailDestino = process.env.EMAIL_DESTINO || process.env.EMAIL_USER;

        // Validar que las credenciales existan
        if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'tu_correo@gmail.com') {
            console.warn("Nodemailer no está configurado. Por favor actualiza EMAIL_USER y EMAIL_PASS en el archivo .env");
            return false;
        }

        // Diseño HTML Profesional
        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #F8FAFC;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e2e8f0;
                }
                .header {
                    background-color: #0B2E4F;
                    padding: 24px 32px;
                    text-align: center;
                }
                .header h1 {
                    color: #ffffff;
                    margin: 0;
                    font-size: 24px;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                }
                .header p {
                    color: #93c5fd;
                    margin: 8px 0 0 0;
                    font-size: 14px;
                }
                .content {
                    padding: 32px;
                }
                .greeting {
                    color: #1e293b;
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 0;
                    margin-bottom: 24px;
                }
                .data-box {
                    background-color: #f1f5f9;
                    border-radius: 8px;
                    padding: 24px;
                    margin-bottom: 24px;
                    border-left: 4px solid #3b82f6;
                }
                .data-row {
                    margin-bottom: 16px;
                }
                .data-row:last-child {
                    margin-bottom: 0;
                }
                .label {
                    display: block;
                    font-size: 12px;
                    text-transform: uppercase;
                    color: #64748b;
                    font-weight: 700;
                    margin-bottom: 4px;
                    letter-spacing: 0.5px;
                }
                .value {
                    font-size: 16px;
                    color: #0f172a;
                    font-weight: 500;
                }
                .message-box {
                    background-color: #ffffff;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    padding: 20px;
                    font-size: 15px;
                    color: #334155;
                    line-height: 1.6;
                    white-space: pre-wrap;
                }
                .footer {
                    background-color: #f8fafc;
                    padding: 20px 32px;
                    text-align: center;
                    border-top: 1px solid #e2e8f0;
                    color: #64748b;
                    font-size: 12px;
                }
                .action-btn {
                    display: inline-block;
                    background-color: #0B2E4F;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-weight: bold;
                    margin-top: 24px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>GrupoKeysistem</h1>
                    <p>Nuevo Mensaje de Contacto</p>
                </div>
                <div class="content">
                    <p class="greeting">Hola, tienes una nueva solicitud de contacto.</p>
                    
                    <div class="data-box">
                        <div class="data-row">
                            <span class="label">Nombre del Cliente</span>
                            <span class="value">${nombre}</span>
                        </div>
                        <div class="data-row">
                            <span class="label">Correo Electrónico</span>
                            <span class="value"><a href="mailto:${correo}" style="color: #3b82f6; text-decoration: none;">${correo}</a></span>
                        </div>
                        <div class="data-row">
                            <span class="label">Teléfono</span>
                            <span class="value">${telefono || 'No proporcionado'}</span>
                        </div>
                    </div>

                    <span class="label">Mensaje del Cliente:</span>
                    <div class="message-box">
                        ${mensaje}
                    </div>

                    <div style="text-align: center;">
                        <a href="mailto:${correo}" class="action-btn">Responder al Cliente</a>
                    </div>
                </div>
                <div class="footer">
                    Este mensaje fue enviado automáticamente desde el formulario web de GrupoKeysistem.<br>
                    Por favor, atiende esta solicitud lo antes posible en el panel de administrador.
                </div>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"GrupoKeysistem Web" <${process.env.EMAIL_USER}>`, // Remitente
            to: emailDestino, // A quién se le envía (ti)
            replyTo: correo, // Si le das a "Responder", se responderá al cliente
            subject: `🔥 Nuevo Contacto Web: ${nombre}`,
            html: htmlTemplate
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error enviando el correo de notificación:', error);
        return false;
    }
};

module.exports = {
    sendContactNotification
};
