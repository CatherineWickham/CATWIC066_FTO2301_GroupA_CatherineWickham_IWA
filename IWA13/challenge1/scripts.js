// IWA13 Challenge 1

let state = 'idle'
let user = null
let calculated = '1'

// Only allowed to change below

const logCalc = () => { 
    const isString = typeof calculated === 'string'
    const calculatedAsNumber = isString ? parseInt(calculated) : calculated
    calculated = calculatedAsNumber + 1 
}
// moved asignment operator after logCalc variable name
// added additional == for equality after typeof calculated
// numerical-string is not a valid data type - changed to string
// parseNumber changed to parseInt, swapped order in ternary around
// changed equality operator on last line to assignment

const calcUser = () => {
  logCalc()
  if (calculated > 2) user = 'John'
  if (calculated > 2) state = 'requesting'
  if (calculated > 3) state = 'idle'
}
// moved asignment operator after calcUser variable name
// logCalc missing () to call the function

const checkUser = () => {
	if (user && state === 'requesting') {
		console.log(`User: ${user} (${calculated})`)
	}
}
// moved asignment operator after checkUser variable name


// Only allowed to change code above

checkUser()
// user doesn't exist - false
calcUser()
// runs logCalc - calculated becomes 2

checkUser()
//user doesn't exist - false
calcUser()
// runs logCalc - calculated becomes 3
// user becomes John, state becomes requesting

checkUser()
// user exists is true, state === requesting is true
// logs user and value of calculated (3)
calcUser()
// runs logCalc - calculated becomes 4
// state becomes idle, shutting down further console logs

checkUser()
calcUser()

checkUser()
calcUser()