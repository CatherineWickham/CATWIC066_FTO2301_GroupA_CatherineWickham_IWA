const WARNING = 'Free shipping only applies to single customer orders'
const BANNED_WARNING = 'Unfortunately we do not ship to your country of residence'
const NONE_SELECTED = 0

const country = 'RSA'
const customers = 1

let shipping = 0

if (country === 'RSA') {
    currency = 'R'
} else {
	currency = "$"
}

let shoes = 300 * 1
let toys = 100 * 5
let shirts = 150 * NONE_SELECTED
let batteries = 35 * 2
let pens = 5 * NONE_SELECTED

let orderTotal = (shoes + toys + shirts + batteries + pens)

if (currency === '$') {
	orderTotal = orderTotal * 60 / 1000
}

let overFreeShipThreshold = false
if ((currency === 'R' && orderTotal > 1000) || (currency === '$' && orderTotal > 60))  {
	overFreeShipThreshold = true
}

if ( (overFreeShipThreshold === true) && (country === 'RSA' || country === 'NAM') && (customers === 1)) {
	shipping = 0
} else {
	if (country === 'RSA') { 
		shipping = 400
	} else if (country === 'NAM') {
		shipping = 600 
	} else  { 
		shipping = 800
	}
}

if ((overFreeShipThreshold === true) && (country === 'RSA' || country === 'NAM') && (customers !== 1)) { 
	console.log(WARNING) 
}

country === 'NK' ? console.log(BANNED_WARNING) : console.log('Price: ', currency, (orderTotal + shipping).toFixed(2))
