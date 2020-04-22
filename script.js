// get html elements
let inputbox = document.querySelector('.box')
let inputCounter = document.querySelector('#in-counter')
let startCounter = document.querySelector('#counting')
let timershape = document.querySelector('.c100')
let timernum = document.querySelector('.c100 > span')
// define global variables
let lastPercent = `p100`
let time, fTime, tInterval;
// prevent submit take-actions
startCounter.addEventListener('click', function (e) {
    e.preventDefault()
})
// add button event listener
startCounter.addEventListener('click', function (e) {
    // get values
    time = parseInt(inputCounter.value)
    fTime = time
    // actions
    toggledisplay({ show: false, element: timershape })
    if (isNaN(time) || time <= 0) return toggleMsg({ show: true, mesg: 'زمان را به شکل صحیح وارد کنید', color: '#e74c3c' })
    toggleMsg({ show: true, mesg: 'در حال اجرای درخواست ...', color: '#e74c3c' })
    toggledisplay({ show: false, element: inputbox })
    toggledisplay({ show: true, element: timershape })

    timernum.textContent = time
    tInterval = setInterval(startTimer, 1000);
})

let startTimer = () => {
    if (lastPercent) { timershape.classList.remove(lastPercent) }
    if (time <= 0) {
        clearInterval(tInterval)
        toggleMsg({ show: true, mesg: 'شمارنده شما با موفقیت به پایان رسید ...', color: '#27ae60' })
        setTimeout(() => {
            toggleMsg({ show: false })
        }, 2600);
        toggledisplay({ show: false, element: timershape })
        toggledisplay({ show: true, element: inputbox })

        inputCounter.value = ''
        return
    }
    time -= 1
    timernum.textContent = time
    let percentbar = lastPercent = `p${Math.abs(Math.floor((((fTime - time) / fTime) * 100) - 100))}`
    timershape.classList.add(`${percentbar}`)
}
let toggleMsg = ({ show, mesg, color }) => {
    let msg = document.querySelector('#msg')
    if (show) {
        msg.classList.add('active')
        msg.style.color = color
        msg.textContent = mesg
    } else {
        msg.classList.remove('active')
        msg.textContent = ''
    }
}
let toggledisplay = ({ show, element }) => {
    if (show) {
        inputCounter.value = ''
        element.style.display = 'block'
    } else {
        element.style.display = 'none'
    }
}
