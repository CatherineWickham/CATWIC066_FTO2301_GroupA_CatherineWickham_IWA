// IWA10 Challenge 1

const currentYear = new Date().getFullYear()

const holidays = {
    0: {
        id: 0,
        name: 'Day of Reconciliation',
        date: `16 December ${currentYear}`,
    },

    1: {
        id: 1,
        name: 'Workers Day',
        date: new Date(`1 April ${currentYear}`),
    },
    2: {
        id: 2,
        name: 'Day of Goodwill',
        date: new Date(`26 December ${currentYear}`),
    },
    3: {
        id: 3,
        name: 'New Year Day',
        date: new Date(`1 January ${currentYear}`),
    },
    4: {
        id: 4,
        name: 'Womens Day',
        date: new Date(`9 August ${currentYear}`),
    },
    5: {
        id: 5,
        name: 'Heritage Day',
        date: new Date(`24 September ${currentYear}`),
    },
    6: {
        id: 6,
        name: 'Christmas Day',
        date: new Date(`25 December ${currentYear} 13:25`),
    },
    7: {
        id: 7,
        name: 'Youth Day',
        date: new Date(`16 June ${currentYear}`),
    },
    8: {
        id: 8,
        name: 'Human Rights Day',
        date: new Date(`21 March ${currentYear}`)
    },
}

const christmas = 6
const futureId = 9

// Do not change code above this comment

console.log((holidays[futureId] && holidays[futureId].name) || `ID ${futureId} not created yet`)
// added AND operator to first check existence of futureID, then only try access name if futureID exists
// put futureID in bracket notation to first evaluate the variable
// added backticks to create template literal and dollar sign for interpolation

const copied = {
    ...holidays[christmas],
    name: 'X-mas',
    date: new Date((new Date(holidays[christmas].date.setHours(0))).setMinutes(0))
}
// used spread operator to create copy that can be altered without changing original object
// changed name to 'X-mas'
// used .setHours and .setMinutes to change the date
// had to use new Date () each time to ensure the input for .setHours and .setMinutes was a Date object
// removed code relating to correctDate variable - not needed

isEarlier = (copied.date < holidays[6].date)
console.log('New date is earlier:', isEarlier)

if (isEarlier) {
    console.log('ID change:', (holidays[christmas].id != copied.id) && copied.id)
    console.log('Name change:', (holidays[christmas].name != copied.name) && copied.name)
    console.log('Date change:', (holidays[christmas].date != copied.date) && copied.date)
    holidays[christmas] = copied
}
// added curly braces to if statement to define actions
// changed || operators to && operators so that the changed name is only returned if first expression true
// i.e. the value in original does not equal corresponding value in copied
// otherwise, will return false (first expression)
// didn't change format of date change to DD/MM/YYYY, since this doesn't show the time change
// moved reassignment statement to the end so logs run first
// updated reassignment statement to work without correctDate variable

const firstHolidayTimestamp = Math.min(
    new Date(holidays[0].date).getTime(),
    new Date(holidays[1].date).getTime(),
    new Date(holidays[2].date).getTime(),
    new Date(holidays[3].date).getTime(),
    new Date(holidays[4].date).getTime(),
    new Date(holidays[5].date).getTime(),
    new Date(holidays[6].date).getTime(),
    new Date(holidays[7].date).getTime(),
    new Date(holidays[8].date).getTime(),
)

const lastHolidayTimestamp = Math.max(
    new Date(holidays[0].date).getTime(),
    new Date(holidays[1].date).getTime(),
    new Date(holidays[2].date).getTime(),
    new Date(holidays[3].date).getTime(),
    new Date(holidays[4].date).getTime(),
    new Date(holidays[5].date).getTime(),
    new Date(holidays[6].date).getTime(),
    new Date(holidays[7].date).getTime(),
    new Date(holidays[8].date).getTime(),
)
// missing brackets after .getTime
// needed to convert values into dates, nested all into new Date()


const firstDay = new Date(firstHolidayTimestamp).getDate()
const firstMonth = new Date(firstHolidayTimestamp).getMonth() + 1
const lastDay = new Date(lastHolidayTimestamp).getDate()
const lastMonth = new Date(lastHolidayTimestamp).getMonth() + 1

// missing brackets after .getDate and .getMonth
// placed first/lastHolidayTimestamp variables into new Date()
// added + 1 to months because getMonth returns index value


console.log(`${(firstDay.toString()).padStart(2, '0')}/${(firstMonth.toString()).padStart(2, '0')}/${currentYear}`)
console.log(`${(lastDay.toString()).padStart(2, '0')}/${(lastMonth.toString()).padStart(2, '0')}/${currentYear}`)

// changed quotes to backticks, added dollar signs
// first converted each variable to string using.toString()
// then nested this into .padStart(2, '0') to add zero before number if needed


let randomHoliday = holidays[Math.round(Math.random()*10)]
if (randomHoliday === undefined) {
    randomHoliday = holidays[Math.round(Math.random()*10)]
}
// used let, to allow randomHoliday to change if returns an index not present in holidays
// Math.random returns a value between 0 and 1, had to convert to whole numbers - multiply by 10 and round
// if the random number generator returns something out of range, randomHoliday will be undefined 
// if undefined, run again

const randomDay = new Date(randomHoliday.date).getDate()
const randomMonth = new Date(randomHoliday.date).getMonth() + 1
console.log(`${(randomDay.toString()).padStart(2, '0')}/${(randomMonth.toString()).padStart(2, '0')}/${currentYear}`)

// set up randomHoliday to log the same as first and last holidays above

