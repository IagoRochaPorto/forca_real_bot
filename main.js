import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { dificuldades, categorias } from './utils.js'
import { hideWord } from './stringManipulator.js'
import { generateWord } from './wordGenerator.js'
dotenv.config()

let jogo = {}

const telegram = new TelegramBot(process.env.TOKEN, { polling: true })

telegram.on('text', (message) => {
  if (message.text.toLowerCase().indexOf('/novo') === 0) {
    if (jogo.hasOwnProperty(message.chat.id)) {
      telegram.sendMessage(message.chat.id, 'Já existe um jogo em andamento')
    } else {
      jogo[message.chat.id] = { jogadores: [] }
      telegram.sendMessage(message.chat.id, 'Jogo iniciado, use /entrar para entrar na partida')
    }
  }

  if (message.text.toLowerCase().indexOf('/entrar') === 0) {
    if (jogo.hasOwnProperty(message.chat.id)) {
      console.log(jogo[message.chat.id])
      if (jogo[message.chat.id].jogadores.includes(message.chat.username)) {
        telegram.sendMessage(message.chat.id, `O jogador ${message.chat.username} Já está no jogo`)
      } else {
        jogo[message.chat.id].jogadores.push(message.chat.username)
        telegram.sendMessage(message.chat.id, `O jogador ${message.chat.username} entrou no jogo`)
      }
    } else {
      telegram.sendMessage(message.chat.id, `Um jogo precisa ser iniciado antes de poder entrar`)
    }
  }

  if (message.text.toLowerCase().indexOf('/iniciar') === 0) {
    if (jogo.hasOwnProperty(message.chat.id) && jogo[message.chat.id].hasOwnProperty('jogadores')) {
      if (jogo[message.chat.id].jogadores.length < 1) {
        telegram.sendMessage(message.chat.id, 'É necessário pelo menos um jogador para começar uma partida')
      } else {
        telegram.sendMessage(message.chat.id, 'Vamos começar o jogo, selecione uma dificuldade:', {
          reply_markup: {
            inline_keyboard: dificuldades,
          },
        })
      }
    } else {
      telegram.sendMessage(message.chat.id, 'É necessário criar um jogo antes de iniciá-lo')
    }
  }

  if (message.text.toLowerCase().indexOf('/encerrar') === 0) {
    if (!jogo.hasOwnProperty(message.chat.id)) {
      telegram.sendMessage(message.chat.id, 'Não existe um jogo em andamento')
    } else {
      delete jogo[message.chat.id]
      telegram.sendMessage(message.chat.id, 'Jogo finalizado')
    }
  }
})

telegram.on('callback_query', (callbackQuery) => {
  if (callbackQuery.data === 'facil' || callbackQuery.data === 'medio' || callbackQuery.data === 'dificil') {
    jogo[callbackQuery.message.chat.id]['dificuldadeSelecionada'] = callbackQuery.data
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
    if (
      jogo.hasOwnProperty(callbackQuery.message.chat.id) &&
      jogo[callbackQuery.message.chat.id].dificuldadeSelecionada
    ) {
      jogo[callbackQuery.message.chat.id]['categoriaSelecionada'] = 'paises'

      const word = generateWord({
        categoria: jogo[callbackQuery.message.chat.id].categoriaSelecionada,
        dificuldade: jogo[callbackQuery.message.chat.id].dificuldadeSelecionada,
      })
      jogo[callbackQuery.message.chat.id]['hiddenWorld'] = hideWord(word)
      telegram.sendMessage(
        callbackQuery.message.chat.id,
        `Jogo iniciado! Primeiro jogador: ${jogo[callbackQuery.message.chat.id].jogadores[0]} Palavra: ${
          jogo[callbackQuery.message.chat.id].hiddenWorld
        }`
      )
    } else {
      telegram.sendMessage(callbackQuery.message.chat.id, 'Dificuldade não foi selecionada')
    }
  }
})
