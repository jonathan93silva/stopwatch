const date = new Date()
const timeWorker = new Worker('./scripts/timeWorker.js')

const cardDisplay = document.querySelector('.card-display')
const checkMilliseconds = document.querySelector('[data-js="check-milliseconds"]')
const selectTaskType = document.querySelector('[data-js="select-taskType"]')

const btnIniciar = document.querySelector('.btnIniciar')
const btnPause = document.querySelector('.btnPause')

window.onload = () => page.load()
checkMilliseconds.onchange = () => page.showHideMilliseconds()
selectTaskType.onchange = ()=> page.changeTaskType()
btnIniciar.onclick = () => page.startStopwatch()
btnPause.onclick = () => page.pauseStopwatch()