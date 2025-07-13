class Stopwatch {
    constructor() {
        this.time = 0;
        this.isRunning = false;
        this.lapTimes = [];
        this.intervalId = null;
        this.startTime = 0;
        this.elapsedTime = 0;
        
        this.initializeElements();
        this.bindEvents();
    }
    
    initializeElements() {
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startStopBtn = document.getElementById('startStopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapSection = document.getElementById('lapSection');
        this.lapList = document.getElementById('lapList');
        this.startStopText = document.getElementById('startStopText');
        this.playIcon = document.getElementById('playIcon');
        this.pauseIcon = document.getElementById('pauseIcon');
    }
    
    bindEvents() {
        this.startStopBtn.addEventListener('click', () => this.toggleStopwatch());
        this.resetBtn.addEventListener('click', () => this.resetStopwatch());
        this.lapBtn.addEventListener('click', () => this.recordLap());
    }
    
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    
    updateDisplay() {
        this.timeDisplay.textContent = this.formatTime(this.time);
    }
    
    updateTime() {
        const currentTime = Date.now();
        this.time = this.elapsedTime + (currentTime - this.startTime);
        this.updateDisplay();
    }
    
    toggleStopwatch() {
        if (!this.isRunning) {
            this.startStopwatch();
        } else {
            this.pauseStopwatch();
        }
    }
    
    startStopwatch() {
        this.startTime = Date.now();
        this.intervalId = setInterval(() => this.updateTime(), 10);
        this.isRunning = true;
        
        
        this.startStopBtn.classList.add('running');
        this.startStopText.textContent = 'Pause';
        this.playIcon.classList.add('hidden');
        this.pauseIcon.classList.remove('hidden');
        this.lapBtn.disabled = false;
    }
    
    pauseStopwatch() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.elapsedTime = this.time;
        this.isRunning = false;
        
        
        this.startStopBtn.classList.remove('running');
        this.startStopText.textContent = 'Start';
        this.playIcon.classList.remove('hidden');
        this.pauseIcon.classList.add('hidden');
        this.lapBtn.disabled = true;
    }
    
    resetStopwatch() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        this.time = 0;
        this.elapsedTime = 0;
        this.isRunning = false;
        this.lapTimes = [];
        
        this.updateDisplay();
        this.startStopBtn.classList.remove('running');
        this.startStopText.textContent = 'Start';
        this.playIcon.classList.remove('hidden');
        this.pauseIcon.classList.add('hidden');
        this.lapBtn.disabled = true;
        this.lapSection.classList.add('hidden');
        this.lapList.innerHTML = '';
    }
    
    recordLap() {
        if (this.isRunning && this.time > 0) {
            const lapTime = {
                id: this.lapTimes.length + 1,
                time: this.formatTime(this.time),
                timestamp: this.time
            };
            
            this.lapTimes.unshift(lapTime);
            this.updateLapDisplay();
            
            if (this.lapSection.classList.contains('hidden')) {
                this.lapSection.classList.remove('hidden');
            }
        }
    }
    
    updateLapDisplay() {
        this.lapList.innerHTML = '';
        
        this.lapTimes.forEach(lap => {
            const lapElement = document.createElement('div');
            lapElement.className = 'lap-item';
            lapElement.innerHTML = `
                <span class="lap-number">Lap ${lap.id}</span>
                <span class="lap-time">${lap.time}</span>
            `;
            this.lapList.appendChild(lapElement);
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});