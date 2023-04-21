// IWA16 Challenge 1

// scripts.js

const MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
  ]
  
  const data = {
	response: {
	  requestType: "FETCH_ATHLETE_DATA",
	  requestBy: "ALL_MATCHING_ATHLETES",
	  forDisplay: "BEST_RACES",
  
	  data: {
		NM372: {
		  firstName: "Nwabisa",
		  surname: "Masiko",
		  id: "NM372",
		  races: [
			{
			  date: '2022-11-18T20:00:00.000Z',
			  time: [9, 7, 8, 6],
			},
			{
			  date: '2022-12-02T20:00:00.000Z',
			  time: [6, 7, 8, 7],
			},
		  ],
		},
  
		SV782: {
		  firstName: "Schalk",
		  surname: "Venter",
		  id: "SV782",
		  races: [
			{
			  date: '2022-11-18T20:00:00.000Z',
			  time: [10, 8, 3, 12],
			},
			{
			  date: '2022-11-25T20:00:00.000Z',
			  time: [6, 8, 9, 11],
			},
			{
			  date: '2022-12-02T20:00:00.000Z',
			  time: [10, 11, 4, 8],
			},
			{
			  date: '2022-12-09T20:00:00.000Z',
			  time: [9, 8, 9, 11],
			},
		  ],
		},
	  },
	},
  };
  
  // Only edit below this comment
  
  const createHtml = (athlete) => {
	const firstName = data.response.data[athlete].firstName; 
	const surname = data.response.data[athlete].surname; 
	const id = data.response.data[athlete].id; 
	const races = data.response.data[athlete].races.length
	const reversedRaces = data.response.data[athlete].races.reverse()
	const date = new Date(reversedRaces[0].date)
	const timeAsArray = reversedRaces[0].time
	// needed to save each of these in a separate variable
	// need to access each from the object above using correct dot/bracket notation
	// races needs to access the length of the races array within the object
	// created reversed array so latest event is first
	// both date and times accessed using this reversed array
	// used new Date constructor for eventDate to make sure date methods would work

	const fragment = document.createDocumentFragment();
  
	const title = document.createElement('h2');
	title.innerHTML = id;
	fragment.appendChild(title);
	// missing const for variable declaration
	// missing quotes around h2 element
	// need to specify that it is the innerHTML of the title we want to change
	
	const list = document.createElement('dl');
	//missing quotes around dl
  
	const day = date.getDate();
	const month = MONTHS[date.getMonth()];
	const year = date.getFullYear();
	// missing consts for variable declaration
	// need to use .getMonth() and .getFullYEar methods respectively instead of just .month/.year
	// month accesses the corresponding key from MONTHS object

	const [first, second, third, fourth] = timeAsArray;
	const total = first + second + third + fourth;
	// need to place positions in an array to use destructuring syntax
	// missing const from both variables
  
	const hours = Math.floor(total / 60);
	const minutes = total - (hours * 60);
	// for hours, need to round down to give last whole hour using Math.floor()
	// for minutes, need to get remainder left after whole hours subtracted

	list.innerHTML = /* html */ `
	  <dt>Athlete</dt>
	  <dd>${firstName} ${surname}</dd>
  
	  <dt>Total Races</dt>
	  <dd>${races}</dd>
  
	  <dt>Event Date (Latest)</dt>
	  <dd>${day} ${month} ${year}</dd>
  
	  <dt>Total Time (Latest)</dt>
	   <dd>${hours.toString().padStart(2, 0)}:${minutes.toString().padStart(2, 0)}</dd>
	 `;
	// firstName and surname needed to be separated
	// as did day/month/year of event date, and hours/minutes
	// converted time results into strings to allow pad start to work on them
	// missing colon between hours and minutes

	fragment.appendChild(list);
	
	return fragment
	// need to return the fragment so it can be passed into appendChild
  }

  document.querySelector('[data-athlete="NM372"]').appendChild(createHtml("NM372"));
  document.querySelector('[data-athlete="SV782"]').appendChild(createHtml("SV782"));
// removed [NM372], [SV782] = data - wasn't necessary
// missing quotes around id numbers in createHTML() call
// corrected selectors to refer to data-athlete attributes
