const page = {
    timerIsRunning: false,

    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,

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

        if(historicDay)
            this.splitTime(historicDay.task_time)
        
        this.renderCardDisplay()
    },

    findHistoricDay(historic){
        return historic.find(({ id_type, task_date }) => {
            const now = new Date()
            const dateItem = new Date(task_date)

            const historicalDayExist = now.getDate() == dateItem.getDate()
            const sameTypeOfTask = id_type == selectTaskType.value

            return historicalDayExist && sameTypeOfTask
        })
    },

    splitTime(timer){
        const divided = timer.split(':')

        this.hours = divided[0]
        this.minutes = divided[1]
        this.seconds = 0
    },

    renderCardDisplay(){
        const hours = this.convertForTwoDigits(this.hours)
        const minutes = this.convertForTwoDigits(this.minutes)
        const seconds = this.convertForTwoDigits(this.seconds)
        const milliseconds = this.convertForTwoDigits(this.milliseconds)

        cardDisplay.innerHTML = 
            `<label>${hours}:${minutes}:${seconds}<small class="milliseconds">.${milliseconds}</small></label>`
        
        this.showHideMilliseconds()
    },

    convertForTwoDigits(time){
        return String(time).length == 1 ? `0${time}` : time
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

            this.renderCardDisplay()
            
            this.milliseconds++
            this.resetPointer('milliseconds', 100, 'seconds')
            this.resetPointer('seconds', 60, 'minutes')
            this.resetPointer('minutes', 60, 'hours')

        }
    },

    pauseStopwatch(){
        this.timerIsRunning = false
    },

    resetPointer(timer, limit, increment){
        if(page[timer] == limit){
            page[timer] = 0
            page[increment]++
        }   
    }

}

/*
    a pagina inicia com as variaveis de tempo zeradas.

    a função load chama a função loadDisplay.

    a função loadDisplay tem a tarefa de verificar o tipo de tarefa
    e caso exista no historico algum registro do dia atual com aquele mesmo tipo de tarefa
    as variaveis são alteradas e apartir delas o display é renderizado
*/