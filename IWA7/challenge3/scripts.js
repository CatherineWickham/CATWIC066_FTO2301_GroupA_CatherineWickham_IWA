// IWA7 Challenge 3

const leoName = 'Leo'
const leoSurname = 'Musvaire     '
const leoBalance = '-9394'

const sarahName = 'Sarah    '
const sarahSurname = 'Kleinhans'
const sarahBalance = '-4582.21000111'

const divider = '----------------------------------'

// Only change below this line

const owed = parseFloat(leoBalance) + parseFloat(sarahBalance)
const leo = `${leoName} ${leoSurname.trim()} (Owed: R ${(Math.abs(parseFloat(leoBalance))).toFixed(2)})`
const sarah = `${sarahName.trim()} ${sarahSurname} (Owed: R ${(Math.abs(parseFloat(sarahBalance))).toFixed(2)})`
const total = `Total amount owed: R ${(Math.abs(owed)).toLocaleString().replace(/,/g," ",)}`
const result = `\n${leo}\n${sarah}\n\n${divider}\n\ \ ${total}\ \ \n${divider}`

console.log(result)

// needed to use backticks to allow multiline strings & interpolation

// took out 'R' string in owed to allow it to convert to number
// added missing dollar signs before variables in curly braces
// removed + operators - don't need to concatenate if using template literals
// Change formatting for Owed section of leo and sarah, put it in brackets

// vaariable name errors:
// leo - leoBalance instead of sarahBalance
// sarah - sarahName and sarahSurname instead of leoname and surname

// added ${owed} in total, removed from result - simpler

// rewrote result as template literal: 
// took out + operators
// added new lines and spacing with escape characters
// used interpolation to bring in all variables

// added toFixed to balances & owed values to make 2 decimal places
// had to convert to float values first, since toFixed takes number input
// had to also convert to absolute value - nested inside Math.abs()

// for total, used .toLocaleString() method to add comma separators
// compounded with .replace() method to change commas to spaces
// this didn't work in combination with toFixed, but it works without it

// Removed whitespace from names using .trim() method