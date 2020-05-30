import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { dificuldades, categorias } from './utils.js'
dotenv.config()

let dificuldadeSelecionada
let categoriaSelecionada

const telegram = new TelegramBot(process.env.TOKEN, { polling: true })

telegram.on('text', (message) => {
  if (message.text.toLowerCase().indexOf('/start') === 0) {
    telegram.sendMessage(message.chat.id, 'Vamos começar o jogo, selecione uma dificuldade:', {
      reply_markup: {
        inline_keyboard: dificuldades,
      },
    })
  }

  if (message.text.toLowerCase().indexOf('/join') === 0) {
    if (dificuldadeSelecionada && categoriaSelecionada) {
      telegram.sendMessage(message.chat.id, `O jogador ${message.chat.username} entrou no jogo`)
    } else {
      telegram.sendMessage(message.chat.id, `Um jogo precisa ser iniciado antes de poder entrar`)
    }
  }
})

telegram.on('callback_query', (callbackQuery) => {
  if (callbackQuery.data === 'facil') {
    dificuldadeSelecionada = 'facil'
    telegram.sendMessage(
      callbackQuery.message.chat.id,
      `Dificuldade selecionada: ${callbackQuery.data}, escolha a categoria:`,
      {
        reply_markup: {
          inline_keyboard: categorias,
        },
      }
    )
  }

  if (callbackQuery.data === 'medio') {
    dificuldadeSelecionada = 'medio'
    telegram.sendMessage(
      callbackQuery.message.chat.id,
      `Dificuldade selecionada: ${callbackQuery.data}, escolha a categoria:`,
      {
        reply_markup: {
          inline_keyboard: categorias,
        },
      }
    )
  }

  if (callbackQuery.data === 'dificil') {
    dificuldadeSelecionada = 'dificil'
    telegram.sendMessage(
      callbackQuery.message.chat.id,
      `Dificuldade selecionada: ${callbackQuery.data}, escolha a categoria:`,
      {
        reply_markup: {
          inline_keyboard: categorias,
        },
      }
    )
  }

  if (callbackQuery.data === 'paises') {
    // const word = generateWord({ categoria: categoriaSelecionada, dificuldade: dificuldadeSelecionada })
    // hiddenWord = hideWord(word)
    categoriaSelecionada = 'paises'
    telegram.sendMessage(callbackQuery.message.chat.id, 'Jogo iniciado')
  }
})
