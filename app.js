let headElement = document.body
let image
let hasImage
let firstImage = 2
let secondImage = 1
let startButton = document.getElementById('startButton')
let endButton = document.getElementById('konec')

let difficulcy = document.createElement('h1')

endButton.style.display = 'none'

const memoryGame = (level) => {
  image = []
  hasImage = []

  startButton.style.display = 'none'
  endButton.style.display = 'inline'
  headElement.appendChild(difficulcy)
  difficulcy.textContent = `${level} level`
  let numberOfCards
  let numberOfImages

  switch (level) {
    case 1:
      numberOfCards = 5
      numberOfImages = 3
      break
    case 2:
      numberOfCards = 7
      numberOfImages = 4
      break
    case 3:
      numberOfCards = 9
      numberOfImages = 5
      break
  }

  for (let i = 0, z = 0; i <= numberOfCards; i++, z++) {
    if (z == numberOfImages) {
      z = 0
    }
    image[i] = document.createElement(`img`)
    image[i].setAttribute('alt', `${i + 1}`)
    hasImage[i] = `./images/${z + 1}.png`
  }

  let newSet = image.length

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }
  shuffle(hasImage)

  image.map((e) => e.setAttribute('width', '130px'))
  image.map((e) => e.setAttribute('height', '150px'))
  image.map((e) => e.setAttribute('src', './images/cart.png'))
  for (let i = 0; i < image.length; i++) {
    headElement.appendChild(image[i])
  }

  image.map((e) =>
    e.addEventListener('click', async function () {
      const alt = e.getAttribute('alt') - 1
      if (firstImage != 2) {
        secondImage = image[alt]
        image[alt].setAttribute('src', hasImage[alt])
      } else {
        firstImage = image[alt]
        image[alt].setAttribute('src', hasImage[alt])
      }

      if (
        firstImage.src == secondImage.src &&
        firstImage.alt != secondImage.alt
      ) {
        newSet -= 2
        setTimeout(function () {
          let remove = image.filter((n) => n.src == secondImage.src)
          remove.map((e) => e.remove())
          firstImage = 2
          secondImage = 1
        }, 500)
      } else if (secondImage !== 1 && firstImage.alt != secondImage.alt) {
        setTimeout(function () {
          firstImage = 2
          secondImage = 1
          image.map((e) => e.setAttribute('src', './images/cart.png'))
        }, 500)
      }

      newSet == 0 &&
        level == 3 &&
        setTimeout(function () {
          startButton.style.display = 'inline'
          endButton.style.display = 'none'
          alert('You win!!! Salam Aleikum')
        }, 500)
      newSet == 0 &&
        level !== 3 &&
        setTimeout(function () {
          level += 1
          memoryGame(level)

          alert('Go next Round')
        }, 500)
    })
  )
}
endButton.addEventListener('click', function () {
  image.map((e) => e.remove())
  startButton.style.display = 'inline'
  endButton.style.display = 'none'
  difficulcy.remove()
  firstImage = 2
  secondImage = 1
})

startButton.addEventListener('click', async function () {
  memoryGame(1)
})
