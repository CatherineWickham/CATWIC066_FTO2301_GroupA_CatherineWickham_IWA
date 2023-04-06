// IWA8 Challenge 1

const leoName = 'Leo Musvaire'
const leoNumber = '2'
const leoStreet = 'Church St.'
const leoPostal = '3105'
const leoBalance = '-10'

const sarahName = 'Sarah    '
const sarahSurname = 'Kleinhans'
const sarahBalance = '-4582.21000111'
const sarahNumber = '13'
const sarahStreet = 'William Close'
const sarahPostal = '0310'

// Only change below this line

const leo = {
	name: leoName,
	balance: leoBalance,
	accessId: "47afb389-8014-4d0b-aff3-e40203d2107f",
	age: 24,
	address: {
		number: leoNumber,
		street: leoStreet,
		postalCode: leoPostal,
	},
}

const sarah = {
	name: sarahName + sarahSurname,
	age: 62,
	accessId: "6b279ae5-5657-4240-80e9-23f6b635f7a8",
	balance: sarahBalance,
	address: {
		number: sarahNumber,
		street: sarahStreet,
		postalCode: sarahPostal,
	},
}

console.log(leo, leo["address"]["postalCode"])
console.log(sarah, sarah["address"]["postalCode"])

// added missing assignment operators for leo and sarah variables
// added missing closing curly bracket for sarah
// assignment operators used after key names - changed to colons and added commas after each value
// can't have spaces in names - removed space from access id - accessID, and changed its value to a string
// can't use kebab case for variable names - changed postal-code to postalCode
// typo in sarah.name - missing 'h' for both name and surname
// removed leoSurname from name property as this variable doesn't exist in list above, surname given as part of name

// using bracket notation in console.log gives error because it is evaluating the expression trying to use variable names
// address/postalCode don't exist as variables - they are unassigned strings
// therefore need to change key names in brackets to strings with quote marks