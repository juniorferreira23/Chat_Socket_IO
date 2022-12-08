const room = window.location.pathname.replace(/\//g, '')
const socket = io(`http://localhost:8000/${room}`)
let user = null

document.addEventListener('DOMContentLoaded', () => {

    socket.on('update_message', (messages) => {
        let div_message_list = '<ul>'

        messages.forEach(message => {
            div_message_list += `<li>${message.user}: ${message.msg}`
        })

        div_message_list += '</ul>'

        const div_messages = document.querySelector('.div_messages')
        div_messages.innerHTML = div_message_list
    })

    const user_form = document.querySelector('#user_form')
    user_form.addEventListener('submit', (event) => {

        event.preventDefault()
        const user_input = document.querySelector('#user').value
        user = user_input
        user_form.remove()
    })

    const message_form = document.querySelector('#message_form')
    message_form.addEventListener('submit', (event) => {

        event.preventDefault()

        if(!user){
            alert('Username Required')
        }else{
            const message = document.querySelector('#msg').value
            document.querySelector('#msg').value = ''
            socket.emit('new_message', {user, msg: message})

            socket.on('update_message', (messages) => {
                console.log(messages)
                let div_message_list = '<ul>'

                messages.forEach(message => {
                    div_message_list += `<li>${message.user}: ${message.msg}`
                })

                div_message_list += '</ul>'

                const div_messages = document.querySelector('.div_messages')
                div_messages.innerHTML = div_message_list
            })
        }    
    })
})


