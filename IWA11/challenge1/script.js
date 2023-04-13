// IWA11 Challenge 1
// script.js

const root1 = document.querySelector('[data-key="order1"]')
const biscuits1 = document.querySelector('[data-key="order1"] .biscuits .count')
const donuts1 = document.querySelector('[data-key="order1"] .donuts .count')
const pancakes1 = document.querySelector('[data-key="order1"] .pancakes .count')
const status1 = document.querySelector('[data-key="order1"] .status dd')

const root2 = document.querySelector('[data-key="order2"]')
const biscuits2 = document.querySelector('[data-key="order2"] .biscuits .count')
const donuts2 = document.querySelector('[data-key="order2"] .donuts .count')
const pancakes2 = document.querySelector('[data-key="order2"] .pancakes .count')
const status2 = document.querySelector('[data-key="order2"] .status dd')

const root3 = document.querySelector('[data-key="order3"]')
const biscuits3 = document.querySelector('[data-key="order3"] .biscuits .count')
const donuts3 = document.querySelector('[data-key="order3"] .donuts .count')
const pancakes3 = document.querySelector('[data-key="order3"] .pancakes .count')
const status3 = document.querySelector('[data-key="order3"] .status dd')

// variable names can't be kebab case or start with numbers, reformatted with numbers at end
// need assignment operators for each, replaced all colons
// need to use document.querySelector, can't search with just document(item)
// set selectors to link variables with appropriate nodes in the DOM

biscuits1.innerText = root1.dataset.biscuits,
donuts1.innerText = root1.dataset.donuts,
pancakes1.innerText = root1.dataset.pancakes,
status1.innerText = root1.dataset.delivered==="true" ? "Delivered" : "Pending"

biscuits2.innerText = root2.dataset.biscuits,
donuts2.innerText = root2.dataset.donuts,
pancakes2.innerText = root2.dataset.pancakes,
status2.innerText = root2.dataset.delivered==="true" ? "Delivered" : "Pending"

biscuits3.innerText = root3.dataset.biscuits,
donuts3.innerText = root3.dataset.donuts,
pancakes3.innerText = root3.dataset.pancakes,
status3.innerText = root3.dataset.delivered==="true" ? "Delivered" : "Pending"

// added .innerText to change the displayed text at the DOM node specified by each variable
// .dataset was missing from the left hand side of the assignments
// Changed Delivered and Pending in "status" to strings since they don't exist as variables
// status is the name of the HTML class not the name of the data property, changed to delivered
// data in HTML attributes stored as strings,
// when coerced into Booleans, all strings truthy, therefore need to check if equal to the string "true"