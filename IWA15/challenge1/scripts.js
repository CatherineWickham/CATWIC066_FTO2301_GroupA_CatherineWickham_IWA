// IWA15 Challenge 1

// scripts.js

const data = {
	lists: [
		['first', [15, 11, 13, 7, 5]],
		['second', [2, 6, 8, 4, 14, 12, 10]],
		['third', [9, 3, 1]],
	]
}

// Only edit below

const [, first] = data.lists[0] || []
const [, second] = data.lists[1] || []
const [, third] = data.lists[2] || []

// was using object {} instead of array [] notation
// destructuring syntax not correct
// on left:
// can't select elements by index (first = 1)
// have to format so it matches the existing arry i.e. use comma to skip first element
// then write variable name you want for second element
// on right:
// need to access each array using data.lists, as is nested in lists, 
// can't use word first/second/third, need to use index notation

const result = []

const extractBiggest = () => {

  let lastNumFirst = first[first.length - 1] || 0
  let lastNumSecond = second[second.length - 1] || 0
  let lastNumThird = third[third.length - 1] || 0

  if (
    (lastNumFirst > lastNumSecond) && 
    (lastNumFirst > lastNumThird)
    ) {
		return first.pop()
	}

	if (
    (lastNumSecond > lastNumFirst) && 
    (lastNumSecond > lastNumThird)
    ) {
		return second.pop()
	}

	return third.pop()
	
}
// JS doesn't support negative indices for index notation - need to use length - 1
// cumbersome to write out, stored the last digit of each array in new variable
// if array is empty, returns undefined - need to spec alternative as 0 using OR to allow comparisons to occur
// first if statement missing condition comparing first and third
// second if statement missing both conditions - checking if value of third is smaller than 1 tells us nothing
// just returning first/second/third will return the array itself and not mutate it
// return first/second/third.pop() - will remove last element and return its value
// value can then to be pushed into result

// Only edit above

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

console.log(result)