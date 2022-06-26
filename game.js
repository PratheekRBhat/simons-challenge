console.log('javascript loaded')
var buttonColors = ['red', 'green', 'yellow', 'blue']
var gamePattern = []
var userSelectedPattern = []
var level = 0
var firstRound = true

document.addEventListener('keypress', function() {
  if (firstRound) {
    firstRound = false
    nextSequence()
  }
})

Array.from(document.getElementsByClassName('btn')).forEach(function(button) {
  button.addEventListener('click', addUserPattern)
})

function nextSequence() {
  userSelectedPattern = []
  document.getElementById('level-title').innerText = 'Level ' + level++

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber]
  gamePattern.push(randomChosenColor)

  var chosenBlock = document.getElementById(randomChosenColor)
  chosenBlock.classList.add('fade')
  setTimeout(function() {
    chosenBlock.classList.remove('fade')  
  }, 500)

  playSound(randomChosenColor)
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

function addUserPattern(event) {
  var userChosenColor = event.currentTarget.id
  userSelectedPattern.push(userChosenColor)
  console.log(userSelectedPattern)

  playSound(userChosenColor)
  animatePress(event.currentTarget)

  verifyAnswer(userSelectedPattern.length - 1)
}

function animatePress(element) {
  element.classList.add('pressed')
  setTimeout(function() {
    element.classList.remove('pressed')
  }, 100)
}

function verifyAnswer(level) {
  if (userSelectedPattern[level] === gamePattern[level]) {
    if (userSelectedPattern.length === gamePattern.length) {
      setTimeout(function() { nextSequence() }, 1000)
    }
  } else {
    playSound('wrong')
    document.getElementById('level-title').innerHTML = 'Game Over!<br> Press A Key To Restart'
    document.body.classList.add('game-over')

    setTimeout(() => {
      document.body.classList.remove('game-over')
    }, 200)

    startOver()
  }
}

function startOver() {
  level = 0
  gamePattern = []
  firstRound = true
}
