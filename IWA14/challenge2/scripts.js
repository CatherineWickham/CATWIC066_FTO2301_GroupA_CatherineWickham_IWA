// IWA14 Challenge 2

// script.js

const add = (a, b) => { return a + b }

const multiply = (a, b) => { return a * b }

// missing parentheses around parameters
// changed operator in multiply to *
// fixed syntax to create valid arrow functions - replaced function with const
// added return keyword - implicit return doesnt work if in curly brackets

function internal() {
	const added = this.add(this.internal.a, this.internal.b)
  const result = this.multiply(added, this.internal.c)
  console.log(result)
}
// "this" is bound to the objects example1 and example2 respectively
// therefore need to add .internal to references to a, b, and c, as they are nested within example1/2
// multiply needs to be run using added and value c, instead of a and b, to get desired result
// created another variable to store result, for clarity
// needs to log the result to the console, not return "this"

// Not allowed to change below this

const example1 = {
	internal: {
		a: 2,
		b: 4,
		c: 8,
	},
	add,
	multiply,
  calculate: internal
}

const example2 = {
	internal: {
		a: 2,
		b: 2,
		c: 3,
	},
	add,
	multiply,
  calculate: internal
}

example1.calculate()
example2.calculate()