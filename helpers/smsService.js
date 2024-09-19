
const axios = require('axios');
const apiUrl = 'https://smsportal.hostpinnacle.co.ke/SMSApi/send';

const sendSms = async(message, contacts) => {
const data = {
  userid: process.env.SMS_USER_ID,
  password: process.env.SMS_PASSWORD,
  senderid: process.env.SMS_SENDER_ID,
  msgType: 'text',
  duplicatecheck: 'true',
  sendMethod: 'quick',
  sms: [
    {
      mobile: contacts,
      msg: message,
    },
  ],
};

axios.post(apiUrl, data, {
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

}

module.exports = {
  sendSms
}