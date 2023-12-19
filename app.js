let headElement = document.body
let image = []
let hasImage = []
let newSet
let firstImage = 2
let secondImage = 1
let startButton = document.getElementById('startButton')
let endButton = document.getElementById('konec')

const start = () => {
  startButton.style.display = 'none'
  for (let i = 0, z = 0; i <= 9; i++, z++) {
    if (z == 5) {
      z = 0
    }
    image[i] = document.createElement(`img`)
    image[i].setAttribute('alt', `${i + 1}`)
    hasImage[i] = `./images/${z + 1}.png`
  }

  newSet = image.length

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
}
startButton.addEventListener('click', async function () {
  start()
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
      } else if (secondImage !== 1) {
        setTimeout(function () {
          firstImage = 2
          secondImage = 1
          image.map((e) => e.setAttribute('src', './images/cart.png'))
        }, 500)
      }
      newSet == 0 &&
        setTimeout(function () {
          startButton.style.display = 'inline'
          alert('You win!!! Salam Aleikum')
        }, 500)
    })
  )
})

endButton.addEventListener('click', function () {
  image.map((e) => e.remove())
  startButton.style.display = 'inline'
})
