// IWA9 Challenge 1

const salary = 4000;
const lodging = 'apartment'
const size = 'large'


// Only change the syntax below (not the values or key names)

const expenses = {
    food: 51.7501,
    transport:  10.2,
}
  
const tax = {
    734: '3%',
    234: '20%',
    913: '12%',
    415: '38%',
    502: '42%',
}

const rent = {
    none: 0,
    'small-room': 200,
    'large-room': 300,
    'small-apartment': 400,
    'large-apartment': 800,
    'small-house': 1200,
    'large-house': 2400,
}

// You can change below however you want

const taxAsDecimal = parseInt(tax[913]) / 100
const startingAfterTax = salary * (1 - taxAsDecimal)
const type = `${size}-${lodging}`
const balance = startingAfterTax - expenses.transport - expenses.food - rent[type]
console.log(balance.toFixed(2))

// added ParseInt to convert tax value into number
// changed tax.913 into bracket notation, can evaluate to match the key
// added brackets around (1 - taxAsDecimal), to evaluate with proper order of operations
// changed type variable to a template literal with correct formatting, so result will match the format of the keys in rent object
// also had to swap around order of size and lodging to match format
// changed expenses to dot notation to access the values within expenses object
// rent.type is not part of expenses object, removed expenses. 
// used bracket notation for rent[type] so that the variable is evaluated and returns the result of interpolation - gives matching string
// added startingAfterTax in balance calculation
// used toFixed method on balance to get 2 decimal places