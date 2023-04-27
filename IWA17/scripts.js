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
        result.push(null)
    }
    return result
}
// need to use let not const, result will be overwritten
// fixed for statement syntax - set i to 0, set condition to i less than length, need to increment ii, semicolons
// need to push to the array to crerate slots - used null as placeholder
// need to return the resulting array

const current = new Date
current.setDate(1)

const startDay = current.getDay() // should be getDay
const daysInMonth = getDaysInMonth(current)



const createData = () => {
    const current = new Date
    current.setDate(1)

    const startDay = current.getDay() // should be getDay
    const daysInMonth = getDaysInMonth(current)

    // was missing const declarations for all variables

   let daysArray = []
    for ( let i = 1; i <= 42; i++) {
        if (i <= startDay || i > daysInMonth + startDay) {
            daysArray.push("")
        } else {
            daysArray.push(i - startDay)
        }
    }
    // created external daysArray variable to keep track of the day of the month, seperately from loop
    // included logic to deal with negative numbers/ numbers over the days in the month
    // doesn't need to be inside loop, just create whitespace in daysArray

    let weeks = createArray(6) // changed to 6 weeks - this month spreads over more than 5
    let dayOfMonth = null // renamed value variable 
    let daysArrayIndex = 0  // need to initialize daysArray index so it can be incremented inside loop

    for (let weekIndex in weeks) { // missing let
        
        let days = createArray(7) // moved to inside loop - allows varaible to reset with each iteration

        weeks[weekIndex] = {
            week: parseInt(weekIndex) + 1,
            days: days
        }
        // needed to assign to correct index of weeks
        // didn't use value variable, just assigned object directly
        // needed to use parseInt on week index - was a string
        // days needs to be an array with 7 slots that can be iterated over, not empty array

        for (let dayIndex in days) { // missing let
            
            dayOfMonth = daysArray[daysArrayIndex] // assigns day of month value from external array
            daysArrayIndex++ // increments the index so next iteration uses next number in this array

            weeks[weekIndex].days[dayIndex] = { // is no result variable, are assiging into weeks array as object literal
                dayOfWeek: parseInt(dayIndex) + 1, // week index was a string - parseInt
                value: dayOfMonth // assigns value as dayOfMonth variable calculated above, no need for logic - predone in daysArray
            }
        }
    }
    return weeks
    
}

// making an array of objects with week number and a nested array of day objeccts with dayOfWeek and values

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class="${classString}">
            ${value}
        </td>
    `
    return result
} 
// changed order so existing added first
// missing class=""
// missing return statement


const createHtml = (data) => {
    let result = ''
    let combinedResults = '' // created variable to store all completed result <tr> elements

    for (let weekIndex in data) { // can't use two variables in for loop, just need to loop through the week indices
        let inner = ''

        inner = addCell(inner, "table__cell table__cell_sidebar", `Week ${data[weekIndex].week}`) 
        // missing $ in front of week and backticks
        // need to assign result to inner variable to update it
    
        for (let dayIndex in data[weekIndex].days) { // days is an array, need to loop through indices, not properties

            let isToday = (new Date).getDate() === data[weekIndex].days[dayIndex].value
            let isWeekend = data[weekIndex].days[dayIndex].dayOfWeek === 1 || data[weekIndex].days[dayIndex].dayOfWeek === 7
            let isAlternate = data[weekIndex].week % 2 == 0
            // for isToday, need to use getDate method to correspond to day value
            // for is Weekend, need to use OR not AND, day cannot be Saturday and Sunday, changed operators to strict equality
            // for isAlternate, need to check if remainder after divsion with 2=0, checking if even
            // for all, missing full references to value/dayOfWeek
            
            let classString = "table__cell"
			if (isToday === true) {classString = `${classString} table__cell_today`}
            if (isWeekend === true) {classString = `${classString} table__cell_weekend`}
            if (isAlternate === true) {classString = `${classString} table__cell_alternate`}
            // added === true to make conditions more explicit
            // missing {} around code block
            // changed equality  after classString to assignment
            // added $ to last two

            let value = data[weekIndex].days[dayIndex].value
            // need to assign the day to be printed into calendar as value to pass into below

            inner = addCell(inner, classString, value)
            // need to assign result to inner variable to update it

            result = `<tr>${inner}</tr>`
        }

       combinedResults = `${combinedResults}${result}` 
       // at end of outer loop, will have collected one weeks worth of data in result
       // need to transfer into final combined results variable at this point so each is in a seperate row
    }
    return combinedResults // was missing a return statement
}

//  Only edit above

const currentDay = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[currentDay.getMonth()]} ${currentDay.getFullYear()}`
// posts current month and year in title

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)


