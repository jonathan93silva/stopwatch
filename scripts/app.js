const page = {
    timerIsRunning: false,

    milliseconds: 1,
    seconds: 57,
    minutes: 59,
    hours: 0,

    load(){
        //load historic
        this.loadDisplay()
    },

    showHideMilliseconds(){
        const milliseconds = document.querySelector('.milliseconds')
        
        checkMilliseconds.checked
            ? milliseconds.classList.remove('d-none')
            : milliseconds.classList.add('d-none')
    },

    loadDisplay(){
        const historicDay = this.findHistoricDay(historic)

        this.renderCardDisplay(historicDay)
        this.showHideMilliseconds()
    },

    findHistoricDay(historic){
        return historic.find(({ id_type, task_date }) => {
            const now = new Date()
            const dateItem = new Date(task_date)

            const historicalDayExist = now.getDay() == dateItem.getDay()
            const sameTypeOfTask = id_type == selectTaskType.value

            return historicalDayExist && sameTypeOfTask
        })
    },

    renderCardDisplay(historicDay){
        cardDisplay.innerHTML = historicDay
            ? `<label>${historicDay.task_time}:00<small class="milliseconds">.00</small></label>`
            : '<label>00:00:00<small class="milliseconds">.00</small></label>'
    },

    changeTaskTape(){
        //salvar timer atual no banco
        //verificar se no dia já possui historico com a taskType selecionada
        
        //se existir historico atualizar o display, se não, zerar display
        this.loadDisplay()
        
        //restaurar botões
    },

    startStopwatch(){
        this.timerIsRunning = true

        timeWorker.onmessage = () => {

            if(!this.timerIsRunning) return

            cardDisplay.innerHTML = 
            `<label>${this.hours}:${this.minutes}:${this.seconds}<small class="milliseconds">.${this.milliseconds}</small></label>`
            
            this.milliseconds++

            if(this.milliseconds == 100){
                this.milliseconds = 0
                this.seconds++
            }

            if(this.seconds == 60){
                this.seconds = 0
                this.minutes++
            }

            if(this.minutes == 60){
                this.minutes = 0
                this.hours++
            }
        }
    },

    pauseStopwatch(){
        this.timerIsRunning = false
    },

}