require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3003,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
}