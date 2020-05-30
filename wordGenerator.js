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

function generateWord({ dificulty, category }) {
  return words[dificulty][category][Math.floor(Math.random() * words[dificulty][category].length)]
}

console.log(generateWord({ dificulty: 'facil', category: 'paises' }))
