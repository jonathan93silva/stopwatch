const page = {
    userId: 1,
    timerIsRunning: false,

    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,

    userHistoric: [],
    tasktype:[],

    async load(){
        this.tasktype = await this.getHistoric('backend/getTasktype.php')
        this.userHistoric = await this.getHistoric('backend/getHistoric.php')

        this.renderSelectTasks()
        this.loadDisplay()
    },

    showHideMilliseconds(){
        const milliseconds = document.querySelector('.milliseconds')
        
        checkMilliseconds.checked
            ? milliseconds.classList.remove('d-none')
            : milliseconds.classList.add('d-none')
    },

    loadDisplay(){
        const historicDay = this.findHistoricDay(this.userHistoric)
        if(historicDay)
            this.splitTime(historicDay.time_task)
        
        this.renderCardDisplay()
    },

    findHistoricDay(userHistoric){
        return userHistoric.find(({ id_tasktype, date_task }) => {
            const now = new Date()
            const dateItem = new Date(Number(date_task))

            const historicalDayExist = now.getDate() == dateItem.getDate()
            const sameTypeOfTask = id_tasktype == selectTaskType.value
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

    changeTaskType(){
        //salvar timer atual no banco
        //verificar se no dia já possui historico com a taskType selecionada
        
        this.hours =  0
        this.minutes =  0
        this.seconds =  0
        this.milliseconds =  0

        this.loadDisplay()
        
        //restaurar botões
    },

    startStopwatch(){
        this.timerIsRunning = true

        timeWorker.onmessage = () => {

            if(!this.timerIsRunning) return
            if(this.seconds == 0 && this.milliseconds == 99) this.saveCurrentState()

            this.renderCardDisplay()
            
            this.milliseconds++
            this.resetPointer('milliseconds', 100, 'seconds')
            this.resetPointer('seconds', 60, 'minutes')
            this.resetPointer('minutes', 60, 'hours')
        }
    },

    pauseStopwatch(){
        this.timerIsRunning = false
        this.saveCurrentState()
    },

    resetPointer(timer, limit, increment){
        if(page[timer] == limit){
            page[timer] = 0
            page[increment]++
        }
    },

    async saveCurrentState(){
        const historicDay = this.findHistoricDay(this.userHistoric)
        const currentTimer = 
            `${this.convertForTwoDigits(this.hours)}:${this.convertForTwoDigits(this.minutes)}`

        if(!historicDay){
            const newTask = {
                id: null,
                id_tasktype: Number(selectTaskType.value),
                id_user: this.userId,
                date_task: new Date().getTime(),
                time_task: currentTimer
            }

            this.userHistoric.push(newTask)
            const resultSave = await this.updateHistoric('backend/save.php', newTask)
            newTask.id = await resultSave[0].id
            return
        }

        historicDay.time_task = currentTimer
        await this.updateHistoric('backend/update.php', historicDay)
    },

    async getHistoric(url){
        try{
            const response = await fetch(url)
    
            if(!response.ok){
                throw new Error('Não foi possivel obter os dados')
            }
    
            const data = await response.json()
            return data
        } catch ({ name, message }) {
            alert(`${name} ${message}`)
        }
    },

    async updateHistoric(url, historicDay){
        try{
            const response = await fetch(url,{
                method:"POST",
                body: "data="+JSON.stringify(historicDay),
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            })
    
            if(!response.ok){
                throw new Error('Não foi possivel obter os dados')
            }
    
            const data = await response.json()
            return data
        } catch ({ name, message }) {
            alert(`${name} ${message}`)
        }
    },

    renderSelectTasks(){
        this.tasktype.forEach(task => {
            const option = document.createElement('option')

            option.value = task.id
            option.textContent = task.description

            selectTaskType.append(option)
        })
    }

}