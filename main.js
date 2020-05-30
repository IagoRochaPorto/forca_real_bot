import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
dotenv.config()

const telegram = new TelegramBot(process.env.TOKEN, { polling: true })

telegram.on('text', (message) => {
  telegram.sendMessage(message.chat.id, 'Hello World, feito por Iago Rocha e Luiz Gustavo')
})
