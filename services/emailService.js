const Sib = require("sib-api-v3-sdk");

const sendEmail = async (subject, recivers, htmlContent) => {
  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_SMTP_KEY;

  const sender = {
    email: "sales@aviondigital.co.ke",
    name: "AvionDigital",
  };

  const transactionalEmailApi = new Sib.TransactionalEmailsApi();

  const result = await transactionalEmailApi
    .sendTransacEmail({
      subject: subject,
      htmlContent: htmlContent,
      sender,
      to: recivers,
    })
    .then((response) => {
      console.log(response);
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return result;
};


module.exports = {
    sendEmail
}
