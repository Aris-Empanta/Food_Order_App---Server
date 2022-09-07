const db = require('../database/db')
const model = require("../models/chatModel")

//All the controllers for the chat section's CRUD operation
module.exports = {
    getMessages : (req, res) => {

        model.getMessages( db, (err, rows) => {
                                                res.send(rows)
                                              })       
    },
    getCustomersNames : (req, res) => {

        model.getCustomersNames( db, (err, rows) =>  {
                                                      if(err)console.log(err)
                                                      res.send(rows)
                                                    })       
    },
    getUnread : (req, res) => {

        model.getUnread( db,  (err, rows) => {
                                                res.send(rows)
                                             })        
    },
    saveMessage : (req, res) => {
      
        let customer = req.body.username
        let sender = req.body.sender
        let message = req.body.message
    
        /* Setting below condition so that admin's messages are not marked 
          as unread to the admin's inbox*/
        if( sender === 'admin' ) {

            let savedAsRead = [customer, sender, message, 'read']
            
            model.saveAsRead( db, savedAsRead )                     
        } else {
            
            let savedAsUnread = [customer, sender, message, 'unread']

            model.saveAsUnread( db, savedAsUnread )            
        }
        
    }
}