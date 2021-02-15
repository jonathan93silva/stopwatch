const cardDisplay = document.querySelector('.card-display')
const btnIniciar = document.querySelector('.btnIniciar')
const btnPause = document.querySelector('.btnPause')
const btnPararSalvar = document.querySelector('.btnPararSalvar')
const optionsConfig = document.querySelector('.options-config')
const timeWorker = new Worker('./scripts/timeWorker.js')
const date = new Date()

let updateClock = false
let showMilliseconds = true

let type = 1
let hours = 1
let minutes = 59
let seconds = 58
let milliseconds = 0

const formatClock = time => String(time).length === 1 ? '0' + time : time

const start = () => {
    btnIniciar.classList.add('d-none')
    btnPause.classList.remove('d-none')
    updateClock = true
    
    timeWorker.onmessage = () => {

        if(!updateClock) return

        milliseconds++

        if(milliseconds == 100){
            milliseconds = 0
            seconds++
        }

        if(seconds == 60){
            seconds = 0
            minutes++
            saveToBanck()
        }

        if(minutes == 60){
            minutes = 0
            hours++
        }

        const display = showMilliseconds
            ? `<label>${formatClock(hours)}:${formatClock(minutes)}:${formatClock(seconds)}.<small>${formatClock(milliseconds)}</small></label>`
            : `<label>${formatClock(hours)}:${formatClock(minutes)}:${formatClock(seconds)}</label>`
        
        cardDisplay.innerHTML = display

    }
    
}

const saveToBanck = async () => {
    const newItem = {
        id_type: type,
        task_date: date.getTime(),
        task_time: 19.34
    }

    console.log(newItem)
    await fetch('backend/save.php', {
        method:"POST",
        body: "data="+JSON.stringify(newItem),
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
    })
    .then(async response => console.log(await response.json()))
    .catch(async err => console.log("erro: ", err))
}

const pause = () => {
    updateClock = false
    btnPause.classList.add('d-none')
    btnIniciar.classList.remove('d-none')
}

const pararSalvar = () => {
    const zerar = confirm('Deseja mesmo zerar o contador?')

    if(!zerar) return

    pause()
    console.log('banco')
    
    hours = 0
    minutes = 0
    seconds = 0
    milliseconds = 0

    cardDisplay.innerHTML = showMilliseconds
        ?'<label>00:00:00.<small>00</small></label>'
        :'<label>00:00:00</label>'
}

const showHideMilliseconds = event => {
    event.target.checked ? showMilliseconds = true : showMilliseconds = false
}

const changeTypeOptions = event => {
    pararSalvar()
    type = event.target.value
}

btnIniciar.addEventListener('click', start)
btnPause.addEventListener('click', pause)
btnPararSalvar.addEventListener('click', pararSalvar)
optionsConfig.children[0].addEventListener('change', showHideMilliseconds)
optionsConfig.children[1].addEventListener('change', changeTypeOptions)
