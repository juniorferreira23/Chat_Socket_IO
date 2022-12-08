const express = require('express')
const app = express()
const PORT = 8000
const socketIO = require('socket.io')

app.use('/grupo1', express.static('./public'))

const server = app.listen(PORT, (error) => {
    if(error){
        console.log('Error ao iniciar o servidor')
    }else{
        console.log('Servidos iniciado com sucesso')
    }
})

let messages_lists = {grupo1: [], grupo2: []}

const io = socketIO(server)

const grupo1 = io.of('/grupo1').on('connection', (socket) => {

    console.log('new connection')
    grupo1.emit('update_message', messages_lists.grupo1)

    socket.on('new_message', (data) => {
        console.log(data)
        messages_lists.grupo1.push(data)

        grupo1.emit('update_message', messages_lists.grupo1)
    })
    
})

const grupo2 = io.of('/grupo1').on('connection', (socket) => {

    console.log('new connection')
    grupo2.emit('update_message', messages_lists.grupo2)

    socket.on('new_message', (data) => {
        console.log(data)
        messages_lists.grupo2.push(data)

        grupo2.emit('update_message', messages_lists.grupo2)
    })
    
})