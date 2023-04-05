// IWA7 Challenge 2

const nickname= "Timmy";
const firstname = "Timothy";

console.log(`Good Morning${(nickname && `, ${nickname}`) || (firstname && `, ${firstname}`) || ""}!`)

// no backticks - is not a template literal and therefore cannot use interpolation

// logical operators currently part of the string, need to create a template literal in which logical operations will occur

// OR allows sequential checking for nickname, then firstname, and finally provides an empty string fallback if neither is available

// need to remove the comma in the console log, so when the empty string is used it doesn't say "Good Morning,!"

// if nickame/firstname exists, AND allows us to transform the variable into a template literal that includes a comma before the name

