let headElement = document.body
let image
let hasImage
let firstImage = 2
let secondImage = 1
let startButton = document.createElement('button')
let endButton = document.createElement('button')
endButton.id = 'konec'
startButton.id = 'startButton'
endButton.textContent = 'End Game'
startButton.textContent = 'Start Game'
headElement.appendChild(endButton)
headElement.appendChild(startButton)

let lvl = document.createElement('h1')
let md = document.createElement('h1')

let form = document.createElement('form')
let field = document.createElement('fieldset')
let field_name = document.createElement('h3')
field_name.textContent = 'CHOOSE MODE'
let input = []
let label = []
field.appendChild(field_name)

field.id = 'field_1'
for (let i = 0; i < 3; i++) {
  input[i] = document.createElement('input')
  label[i] = document.createElement('label')

  input[i].type = 'radio'
  switch (i) {
    case 0:
      input[i].value = 'hard'
      label[i].textContent = 'hard'
      break
    case 1:
      input[i].value = 'medium'
      label[i].textContent = 'medium'
      break
    case 2:
      input[i].value = 'easy'
      label[i].textContent = 'easy'
      break
  }
  input[i].name = 'field_1'
  label[i].htmlFor = input[i].id

  field.appendChild(input[i])
  field.appendChild(label[i])
}

form.appendChild(field)
headElement.appendChild(form)

endButton.style.display = 'none'

const gameOptions = { difficulty: 0 }
input.map((e) =>
  e.addEventListener('change', function () {
    if (this.checked) {
      gameOptions.difficulty = this.value
    }
  })
)

let time = document.createElement('h2')
let timer
function bigTimer(sec, min) {
  timer = setInterval(function () {
    switch (min) {
      case 3:
        time.style.fontSize = '75px'
        time.style.color = 'red'
        time.textContent = 'Ready'
        break
      case 2:
        time.textContent = 'Steady'
        break
      case 1:
        time.style.color = 'green'
        time.textContent = 'GO!'
        break
    }
    min--
    if (min < 0) {
      image.map((e) => (e.style.display = 'inline'))
      time.style.color = 'black'
      time.style.fontSize = '25px'
      time.textContent = sec
      sec--
      if (sec < -1) {
        clearInterval(timer)
      }
      sec === -1 &&
        setTimeout(function () {
          end()
          alert('YOU lose!')
        }, 500)

      if (sec < 4) {
        time.style.fontSize = '35px'
        time.style.color = 'red'
      }
    }
  }, 1000)
}

const end = () => {
  image.map((e) => e.remove())
  startButton.style.display = 'inline'
  endButton.style.display = 'none'
  gameOptions.difficulty = 0
  field.style.display = 'inline'
  input.map((e) => {
    e.checked = false
  })
  lvl.remove()
  md.remove()
  time.remove()
  time.textContent = null
  clearInterval(timer)
  firstImage = 2
  secondImage = 1
}
const memoryGame = (level, mode) => {
  clearInterval(timer)
  image = []
  hasImage = []
  startButton.style.display = 'none'
  endButton.style.display = 'inline'
  const imageContainer = document.createElement('div')
  imageContainer.id = 'img_contain'
  headElement.appendChild(lvl)
  headElement.appendChild(md)

  headElement.appendChild(time)
  lvl.textContent = `${level} level`
  md.textContent = `${mode} mode`
  let numberOfCards
  let numberOfImages
  switch (mode) {
    case 'hard':
      switch (level) {
        case 1:
          numberOfCards = 5
          numberOfImages = 3
          bigTimer(8, 3)
          break
        case 2:
          numberOfCards = 7
          numberOfImages = 4
          bigTimer(12, 3)
          break
        case 3:
          numberOfCards = 9
          numberOfImages = 5
          bigTimer(16, 3)
          break
      }
      break
    case 'medium':
      switch (level) {
        case 1:
          numberOfCards = 5
          numberOfImages = 3
          bigTimer(14, 3)
          break
        case 2:
          numberOfCards = 7
          numberOfImages = 4
          bigTimer(23, 3)
          break
        case 3:
          numberOfCards = 9
          numberOfImages = 5
          bigTimer(33, 3)
          break
      }
      break
    case 'easy':
      switch (level) {
        case 1:
          numberOfCards = 5
          numberOfImages = 3
          bigTimer(20, 3)
          break
        case 2:
          numberOfCards = 7
          numberOfImages = 4
          bigTimer(30, 3)
          break
        case 3:
          numberOfCards = 9
          numberOfImages = 5
          bigTimer(40, 3)
          break
      }
      break
  }
  for (let i = 0, z = 0; i <= numberOfCards; i++, z++) {
    if (z == numberOfImages) {
      z = 0
    }
    image[i] = document.createElement(`img`)
    image[i].setAttribute('alt', `${i + 1}`)
    hasImage[i] = `./images/${z + 1}.png`
    imageContainer.appendChild(image[i])
  }
  image.map((e) => (e.style.display = 'none'))

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

  headElement.appendChild(imageContainer)

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
          lvl.remove()
          end()
          alert('You win!!! Salam Aleikum')
        }, 500)
      newSet == 0 &&
        level !== 3 &&
        setTimeout(function () {
          level += 1
          memoryGame(level, gameOptions.difficulty)
          alert('Go next Round')
        }, 500)
    })
  )
}

endButton.addEventListener('click', function () {
  end()
})
startButton.addEventListener('click', function () {
  if (gameOptions.difficulty != 0) {
    memoryGame(1, gameOptions.difficulty)
    field.style.display = 'none'
  } else {
    alert('choose your mode at first')
  }
})
