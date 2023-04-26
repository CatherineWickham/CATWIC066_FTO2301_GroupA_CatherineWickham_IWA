// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

const createArray = (length) => {
    let result = []

    for ( let i = 0; i < length; i++) {
        result.push(0)
    }

    return result
}
// fixed for statement syntax
// need to push null/empty to the array to fill up spaces
// need to return the resulting array

const current = new Date
current.setDate(1)

const startDay = current.getDay() // should be getDay, missing decarations for all variables
const daysInMonth = getDaysInMonth(current)

const createData = () => {
    const current = new Date
    current.setDate(1)

    const startDay = current.getDay() // should be getDay, missing decarations for all variables
    const daysInMonth = getDaysInMonth(current)

   let daysArray = []
    
    for ( let i = 1; i <= 42; i++) {
        if (i <= startDay || i > daysInMonth + startDay) {
            daysArray.push("")
        } else {
            daysArray.push(i - startDay)
        }
    }
    
    // let allDaysArrays = [
    //     daysArray.slice(0,7),
    //     daysArray.slice(7,14),
    //     daysArray.slice(14,21),
    //     daysArray.slice(21,28),
    //     daysArray.slice(28,35),
    //     daysArray.slice(35,43),
    // ]
    
    let weeks = createArray(6)
    let days = createArray(7)

    let dayOfMonth = 0
    let daysArrayIndex = 0 

    for (let weekIndex in weeks) { // missing let
        weeks[weekIndex] = {
            week: parseInt(weekIndex) + 1,
            days: days
        }
                
        // daysArray = allDaysArrays[parseInt(weekIndex)]

        for (let dayIndex in days) { // missing let
            
            // dayOfMonth = allDaysArrays[parseInt(weekIndex)][daysArrayIndex]
            // daysArrayIndex++
            
            dayOfMonth = daysArray[daysArrayIndex]
            daysArrayIndex++

            // day = day + parseInt(dayIndex) - startDay + 1 //TODO: Fix values in weeks after first

            // day = day + weeks[parseInt(weekIndex) - 1].days[6].value
            // day = day + weeks[parseInt(weekIndex) - 1]

            // if (day <= 0 || day > daysInMonth) {
            //     day = ""
            // }

            // weeks[weekIndex].days[dayIndex].dayOfWeek = parseInt(dayIndex) + 1
            // weeks[weekIndex].days[dayIndex].dayOfMonth = dayOfMonth

            weeks[weekIndex].days[dayIndex] = {
                dayOfWeek: parseInt(dayIndex) + 1,
                value: dayOfMonth
            }
            
            // console.log(weeks)
            // console.log(weeks[weekIndex].days[dayIndex])
            // console.log("Week:", weekIndex, "Day:", dayIndex, "Date:", dayOfMonth)
            // console.log(weeks[weekIndex].days[dayIndex])
        }
        
        // overwrites prev values of object with each iteration, so end up with last run of values in daysArray
        // keeps putting values in same week
        // could split up each array?
    }
    // console.log(weeks)
    return weeks
    
}

// making an array of objects with week number and a nested array of day objeccts with dayOfWeek and values

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class=${classString}>
            ${value}
        </td>
    `
    return result
} 
// adding new cells before existing??
// missing class=""
// missing return statement


const createHtml = (data) => {
    let result = ''
    let inner = ''
    let combinedRows = ''

    for (let index in data) {
        
        inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${data[index].week}`) // missing $ in front of week and backticks
    
        for (let index2 in data[index].days) {

            let isToday = (new Date("30 April 2023")).getDate() === data[index].days[index2].value // REMEMBER TO CHANGE BACK TO ACTUAL CURRENT DATE, NOT 30 April
            let isWeekend = data[index].days[index2].dayOfWeek == 1 || data[index].days[index2].dayOfWeek == 7
            let isAlternate = data[index].week % 2 == 0
            
            let classString = "table__cell"
			if (isToday === true) {classString = `${classString} table__cell_today`}
            if (isWeekend === true) {classString = `${classString} table__cell_weekend`}
            if (isAlternate === true) {classString = `${classString} table__cell_alternate`}

            let value = data[index].days[index2].value

            inner = addCell(inner, classString, value)

            result = `<tr>${inner}</tr>`
        }

       combinedRows = `${combinedRows}${result}`
    }
 console.log(combinedRows)
 return combinedRows
 
}

//  Only edit above

const currentDay = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[currentDay.getMonth()]} ${currentDay.getFullYear()}`
// posts current month and year in title

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)


