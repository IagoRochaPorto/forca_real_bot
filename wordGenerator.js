const words = {
  facil: {
    paises: ['brasil', 'alemanha', 'portugal', 'espanha'],
  },
  medio: {
    paises: ['brasil', 'alemanha', 'portugal', 'espanha'],
  },
  dificil: {
    paises: ['brasil', 'alemanha', 'portugal', 'espanha'],
  },
}

export function generateWord(request) {
  console.log(
    words[request.dificuldade][request.categoria][
      Math.floor(Math.random() * words[request.dificuldade][request.categoria].length)
    ]
  )
  return words[request.dificuldade][request.categoria][
    Math.floor(Math.random() * words[request.dificuldade][request.categoria].length)
  ]
}
