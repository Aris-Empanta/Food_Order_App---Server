const express = require("express")
const app = express()
//Creating a new server for socket.io with express
const server = require('http').createServer(app)
//The socket.io server instance attached to an instance of http.Server.
const io = require('socket.io')(server, {
                                cors: {
                                origin: "*",
                                methods: ["GET", "POST"],
                                }
                            })
const port = process.env.PORT || 5000
const cors = require("cors")
const sockets = require("./socket_io/socket_io")(io)

//const db = require("./database/db")
//db.query(`ALTER TABLE products RENAME COLUMN Delivery_price TO Price`)

//The middlewares needed to exchange data with frontend.
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//Importing routes
const productsRoute = require("./routes/products")
const chatRoute = require("./routes/chat")
const nodemailerRoute = require("./routes/nodemailer")
const ordersRoute = require("./routes/orders")
const customersRoute = require("./routes/customers")

app.use('/products', productsRoute)
app.use('/chat-messages', chatRoute)
app.use('/confirm-email', nodemailerRoute)
app.use('/orders', ordersRoute)
app.use('/customers', customersRoute)

app.listen(port, () => console.log(`App is listening on port ${port}`))
server.listen(5001, () => console.log(`Socket is listening on port 5001`))