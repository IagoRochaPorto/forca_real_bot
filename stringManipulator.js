const hideWord = function () {
  let word = 'Farofa'
  let remove = ' '
  let movieList = word.split(remove)

  movieList = movieList.filter((palavra) => {
    if (palavra) {
      return true
    }
  })

  let novoArray = movieList.map((palavra) => {
    let newPalavra = ''
    for (let i = 0; i < palavra.length; i++) {
      newPalavra += '_'
    }
    return newPalavra
  })
  console.log(novoArray)
  let hiddenWord = novoArray.join(' ')
  return hiddenWord
}

console.log(hideWord())
