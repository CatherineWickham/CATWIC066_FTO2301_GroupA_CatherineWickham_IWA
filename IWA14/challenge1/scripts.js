// IWA14 Challenge 1

firstName = 'John';
age = 35;
hobby = 'Coding';

const logTwice = (parameter) => {
  console.log(parameter)
  console.log(parameter)
}
// missing .log in console.log()
// missing parameter in first line


function logHobbyTwice () {
  logTwice(`Hello, ${firstName} (${age}). I love ${hobby}!`)
}
// naming conflict between value hobby and function hobby
// renamed function hobby to logHobbyTwice
// name variable should be firstName

logHobbyTwice()
// updated function call to have same name as definition