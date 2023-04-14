// IWA12 Challenge 1

// scripts.js

const STATUS_MAP = {
    shelf: {
        color: 'green',
        canReserve: true,
        canCheckout: true,
        canCheckIn: false,
    },
    reserved: {
        color: 'blue',
        canReserve: false,
        canCheckout: true,
        canCheckIn: false,
    },
    overdue: {
        color: 'red',
        canReserve: false,
        canCheckout: false,
        canCheckIn: true,
    },
    checkedOut: {
        color: 'orange',
        canReserve: false,
        canCheckout: false,
        canCheckIn: true,
    }
}

// Edit below line 

status0 = document.querySelector('#book1 p .status')
reserve0 = document.querySelector('#book1 .reserve')
checkout0 = document.querySelector('#book1 .checkout')
checkin0 = document.querySelector('#book1 .checkin')

status1 = document.querySelector('#book2 p .status')
reserve1 = document.querySelector('#book2 .reserve')
checkout1 = document.querySelector('#book2 .checkout')
checkin1 = document.querySelector('#book2 .checkin')

status2 = document.querySelector('#book3 p .status')
reserve2 = document.querySelector('#book3 .reserve')
checkout2 = document.querySelector('#book3 .checkout')
checkin2 = document.querySelector('#book3 .checkin')

// added numbers to variable names to correlate with below
// added document.querySelector('') to each
// added appropriate selectors

checkin0.style.color = ''
status0.style.color = STATUS_MAP[status0.textContent].color
reserve0 = STATUS_MAP[status0.textContent].canReserve ? reserve0.disabled = false : reserve0.disabled = true
checkout0 = STATUS_MAP[status0.textContent].canCheckout ? checkout0.disabled = false : checkout0.disabled = true
checkin0 = STATUS_MAP[status0.textContent].canCheckIn ? checkin0.disabled = false : checkin0.disabled = true

checkin1.style.color = ''
status1.style.color = STATUS_MAP[status1.textContent].color
reserve1 = STATUS_MAP[status1.textContent].canReserve ? reserve1.disabled = false : reserve1.disabled = true
checkout1 = STATUS_MAP[status1.textContent].canCheckout ? checkout1.disabled = false : checkout1.disabled = true
checkin1 = STATUS_MAP[status1.textContent].canCheckIn ? checkin1.disabled = false : checkin1.disabled = true

checkin2.style.color = ''
status2.style.color = STATUS_MAP[status2.textContent].color
reserve2 = STATUS_MAP[status2.textContent].canReserve ? reserve2.disabled = false : reserve2.disabled = true
checkout2 = STATUS_MAP[status2.textContent].canCheckout ? checkout2.disabled = false : checkout2.disabled = true
checkin2 = STATUS_MAP[status2.textContent].canCheckIn ? checkin2.disabled = false : checkin2.disabled = true

// typo Reserver -> Reserve
// fixed variable names - removed dots in between name and number 

// Added missing .style in each checkin.color
// change none to empty string to overwrite green styling in html

// there is no key called status in status map object - the status data for each book is stored in the HTML
// need to use [status0/1/2.textContent] to extract info from HTML
// that info is then used as the key in status map to get appropriate settings for each book

// disabled and enabled as strings - won't actually disable the buttons
// need to set disabled to true/false on each variable