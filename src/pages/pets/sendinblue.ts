import * as SibApiV3Sdk from "@sendinblue/client";
const apiInstance = new SibApiV3Sdk.AccountApi();
const otro = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
   SibApiV3Sdk.AccountApiApiKeys.apiKey,
   "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"
);

process.env.SENDINBLUE;
let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
// const sendinblue = () => {
//    // Configuración de la API de Sendinblue
//    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//    // Código para enviar correos electrónicos utilizando Sendinblue
//    // ...

//    // Ejemplo de envío de un correo electrónico
//    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//    sendSmtpEmail.subject = "Correo de prueba";
//    sendSmtpEmail.htmlContent =
//       "<html><body><h1>¡Hola!</h1><p>Este es un correo de prueba enviado por Sendinblue.</p></body></html>";
//    sendSmtpEmail.sender = { name: "Remitente", email: "bruno.am.59@gmail.com" };
//    sendSmtpEmail.to = [{ email: "bruno_am_22hotmail.com" }];

//    // Llamada a la API de Sendinblue para enviar el correo electrónico
//    apiInstance.sendTransacEmail(sendSmtpEmail).then(
//       (response) => {
//          console.log("Correo electrónico enviado:", response);
//       },
//       (error) => {
//          console.error("Error al enviar el correo electrónico:", error);
//       }
//    );
// };

export { sendSmtpEmail, apiInstance, otro };

// import { SibApiV3Sdk } from 'sib-api-v3-sdk';

// const apiKey = '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'; // Reemplaza con tu API key de Sendinblue

// // Configuración de la biblioteca
// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// defaultClient.authentications['api-key'].apiKey = apiKey;

// const transactionalEmailsApi = new TransactionalEmailsApi();

// const sendEmail = async () => {
//   const sendSmtpEmail = new SendSmtpEmail();
//   sendSmtpEmail.sender = { name: 'Nombre remitente', email: 'remitente@example.com' };
//   sendSmtpEmail.to = [{ email: 'destinatario@example.com', name: 'Nombre destinatario' }];
//   sendSmtpEmail.subject = 'Asunto del correo';
//   sendSmtpEmail.htmlContent = '<p>Contenido del correo electrónico</p>';

//   try {
//     const response = await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
//     console.log('Correo electrónico enviado:', response);
//   } catch (error) {
//     console.error('Error al enviar el correo electrónico:', error);
//   }
// };

// sendEmail();
