const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const { PORT, REMINDER_BINDING_KEY } = require('./config/serverConfig');
const jobs = require('./utils/jobs');
const { createChannel, subscribeMessage } = require('./utils/messageQueue');
const EmailService = require('./services/email-service');

const app = express();

const setupServerAndStart = async() => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', apiRoutes);
    
    const channel = await createChannel();
    await subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server up and running on PORT: ${PORT}`);
        
        // jobs(); 
    })
}

setupServerAndStart();