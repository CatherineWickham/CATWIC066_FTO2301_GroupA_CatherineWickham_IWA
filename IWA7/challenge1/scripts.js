// IWA7 Challenge 1

const value = 3
console.log(value + 4 + value)

// initially doesn't work because '3' is a string. Using the + operator causes coercion of the 4 into a string as well
// concatenation then gives 343
// changing the 3 into a number fixes the problem