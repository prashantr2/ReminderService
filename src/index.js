const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');
const { sendBasicEmail } = require('./services/email-service');
const nodeCron = require('node-cron');

const app = express();

const setupServerAndStart = async() => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server up and running on PORT: ${PORT}`);
        
        // sendBasicEmail(
        //     'support@admin.com',
        //     'prashantrawat2com@gmail.com',
        //     'This is a testing email',
        //     'Hey! Hope you received the mail'
        // );
        
        nodeCron.schedule('*/1 * * * *', () => {
            console.log('Running a task every minute');
        })
    })
}

setupServerAndStart();