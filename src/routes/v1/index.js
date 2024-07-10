const express = require('express');
const { TicketController } = require('../../controllers/index');

const router = express();

// Tickets
router.post('/ticket', TicketController.create);


module.exports = router;