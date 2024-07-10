const { NotificationTicket } = require('../models/index');
const { Op } = require('sequelize');

class TicketRepository {
    async getAll(filter) {
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                }
            });
            return tickets;
        } catch (error) {
            console.log("Something went wrong in notification-ticket repository") 
            throw error;
        }
    } 
    
    async create(data) {
        try {
            console.log(data);
            const ticket = await NotificationTicket.create(data); 
            return ticket;
        } catch (error) {
            console.log("Something went wrong in notification-ticket repository") 
            throw error;
        }
    }
    
    async get(filter){
        try {
            const tickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date(),
                    }
                }
            }) 
            return tickets;
        } catch (error) {
            console.log("Something went wrong in notification-ticket repository") 
            throw error;
        }
    }
    
    async update(ticketId, data) {
        try {
            const ticket = await NotificationTicket.findByPk(ticketId);
            if (ticket.status) ticket.status = data.status;
            await ticket.save();
            return ticket;
        } catch (error) {
            console.log(error); 
            throw error;
        }
    }
}

module.exports = TicketRepository;