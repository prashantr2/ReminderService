const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');
const jobs = require('./utils/jobs');
const { createChannel } = require('./utils/messageQueue');

const app = express();

const setupServerAndStart = async() => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/api', apiRoutes);
    
    const channel = await createChannel();

    app.listen(PORT, () => {
        console.log(`Server up and running on PORT: ${PORT}`);
        
        // jobs(); 
    })
}

setupServerAndStart();