import { BOOKS_PER_PAGE, authors, genres, books, html } from './data.js'
// need to import objects from data

let matches = books 
// baseline of matches when not searching is whole books object, matches gets overwritten after a search, needed let declaration
let page = 1 
// setting starting page of book results

let range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
// sets starting range using page = 1

if (!books || !Array.isArray(books)) throw new Error('Source required') // if books doesn't exist AND is not an array, throw error. Should be OR?
if (!range || range.length < 2) throw new Error('Range must be an array with two numbers')

// // populates data list with details of books in the extracted slice. How will this be updated if you want to see more than 36 results?
// for (i = 0; i < extracted.length ; i++) { 
//         // for loop not structured correctly, need to initialize i, set number of times loop will run
//         // extracted is an array, not a length
//         // move setting of variables into loop body

//     const [ { author, image, title, id } ] = extracted // need to check destructuring syntax

//     const preview = createPreview({ //createPreview function does not exist?
//         author,
//         id,
//         image,
//         title
//     })
//     // will need to convert author id code to actual author name

//     fragment.appendChild(preview) // adds each book's preview info to fragement
// }

// data-list-items.appendChild(fragment) // adds fragment containing all previews into data list items - needs to be a document.querySelector

const createPreviewsFragment = (matches, range) => {
    let extracted = matches.slice(range[0], range[1])
    
    let fragment = document.createDocumentFragment()

    for (let index in extracted) { 
        const { author, image, title, id } = extracted[index]
    
        let listElement = document.createElement('button')
        listElement.classList = 'preview'
        listElement.setAttribute('data-list-preview', id)

        listElement.innerHTML = /* html */ `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    fragment.appendChild(listElement)
    }

    return fragment
}

// Creates first instance of list items, no search filters applied, first 36 books listed
html.list.items.appendChild(createPreviewsFragment(matches, range))


// // trying to set text of show more button (data-list-button)
// // need backticks for template literal, need to use a doc query selector and change textContent
// data-list-button = "Show more (books.length - BOOKS_PER_PAGE)"

// // if number of matches is less than set number books per page, then disable show more button
// data-list-button.disabled = !(matches.length - [page * BOOKS_PER_PAGE] > 0)

let remainingItems = matches.length - (page * BOOKS_PER_PAGE)

html.list.button.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingItems > 0 ? remainingItems : 0})</span>
`
if (remainingItems <= 0) {
    html.list.button.disabled = true
}
// changed data-list-button.innerHTML to html.list.button.innerHTML
// removed extra punctuation marks




// // Event listeners & handlers
// 
// .click() is not a valid method
// won't be able to access elements without document query selector
// .open === true doesn't do anything unless a behaviour linked to it

// data-search-cancel.click() { data-search-overlay.open === false } // open property?? is data-search-overlay in some kind of object map?
// data-settings-cancel.click() { querySelect(data-settings-overlay).open === false }
// data-settings-form.submit() { actions.settings.submit }
// data-list-close.click() { data-list-active.open === false }

// // opens next page of results on click of Show More button
// // again, createPreviewsFragment function doesn't exist, perhaps it should? Seems to take arguments matches, page and books per page here

// data-list-button.onclick() {
//     document.querySelector([data-list-items]).appendChild(createPreviewsFragment(matches, page x BOOKS_PER_PAGE, {page + 1} x BOOKS_PER_PAGE]))
//     actions.list.updateRemaining()
//     page = page + 1
// }

// opens search menu
// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// decided to change to have seperate event listeners & handlers:

const handleSearchOpen = () => {
    html.search.overlay.style.display = 'block'
    html.search.title.focus()
}

const handleSearchCancel = () => {
    html.search.overlay.style.display = 'none'
    html.search.form.reset()
}

const handleSearchSubmit = (event) => {
    html.search.overlay.style.display = 'none'
    event.preventDefault()
       
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    let result = []

    // if have time, replace if/else statement to address underlying issue - 7 entries have empty genre arrays
    if (filters.title === "" && filters.genre === 'any' && filters.author === 'any') {
        result = books
    } else {        
        for (let singleBook in books) {
            const titleMatch = filters.title.trim() === '' || (books[singleBook].title.toLowerCase()).includes(filters.title.toLowerCase())
            const authorMatch = filters.author === 'any' || books[singleBook].author === filters.author
            let genreMatch = false
           
                for (let singleGenre in books[singleBook].genres) {
                    if (filters.genre === 'any') {
                        genreMatch = true
                    }
                    else if (books[singleBook].genres[singleGenre] === filters.genre) {
                        genreMatch = true
                    }
                    // genreMatch = filters.genre === 'any' || books[singleBook].genres[singleGenre] === filters.genre
                }
                
            if (titleMatch && authorMatch && genreMatch) {
                result.push(books[singleBook])
            }
        }
    }

    matches = result
    matches.length === 0 ? html.list.message.style.display = 'block' : html.list.message.style.display = 'none'

    page = 1
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
    html.list.button.disabled = false

    html.list.items.innerHTML = ""
    html.list.items.appendChild(createPreviewsFragment(matches, range))

    const previewsArray = Array.from(document.querySelectorAll('.preview'))
    for (const preview of previewsArray){
        preview.addEventListener('click', handleOpenActivePreview)
    }

    let remaining = matches.length - BOOKS_PER_PAGE
    let hasRemaining = remaining > 0

    html.list.button.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${hasRemaining === true ? remaining : 0})</span>
    `
    if (hasRemaining === false) {
    html.list.button.disabled = true // may need to reset this to false if getting filtered results
    }

    html.search.form.reset()
}
// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book) // if matches criteria, push to result array
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    // if no results, display no results message

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1]) // what is this range??? what is source?


const handleSettingsOpen = () => {
    html.settings.overlay.style.display = 'block'
}

const handleSettingsCancel = () => {
    html.settings.overlay.style.display = 'none'
}

const handleOpenActivePreview = (event) => {
    html.list.active.style.display = 'block'
    
    const { target } = event 
    const previewId = target.closest('[data-list-preview]').dataset.listPreview

    let activeBook = null

    for (let singleBook in books) {
        if (books[singleBook].id === previewId) {
            activeBook = books[singleBook]
            break
        }
    }

    const { image, title, author, published, description } = activeBook

    html.list.blur.setAttribute('src', image)
    html.list.image.setAttribute('src', image)
    html.list.title.textContent = title
    html.list.subtitle.textContent = `${authors[author]} (${new Date(published).getFullYear()})`
    html.list.description.textContent = description

}

const handleCloseActivePreview = () => {
    html.list.active.style.display = 'none'
}

const handleShowMore = () => {
    let initial = matches.length - (page * BOOKS_PER_PAGE)
    
    page = page + 1
    range = [(page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE]
    html.list.items.appendChild(createPreviewsFragment(matches, range))

    const previewsArray = Array.from(document.querySelectorAll('.preview'))
    for (const preview of previewsArray){
        preview.addEventListener('click', handleOpenActivePreview)
    }

    let remaining = initial - BOOKS_PER_PAGE
    let hasRemaining = remaining > 0

    html.list.button.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${hasRemaining === true ? remaining : 0})</span>
    `
    if (hasRemaining === false) {
    html.list.button.disabled = true // may need to reset this to false if getting filtered results
    }
}

//     // calculating nunmber remaining matches?
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     // setting innerHTML for show more button - already did this?
//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

html.headerButtons.search.addEventListener('click', handleSearchOpen) 
html.search.cancel.addEventListener('click', handleSearchCancel)
html.search.form.addEventListener('submit', handleSearchSubmit)

html.headerButtons.settings.addEventListener('click', handleSettingsOpen)
html.settings.cancel.addEventListener('click', handleSettingsCancel)


const previewsArray = Array.from(document.querySelectorAll('.preview'))
for (const preview of previewsArray){
    preview.addEventListener('click', handleOpenActivePreview)
}
html.list.close.addEventListener('click', handleCloseActivePreview)

html.list.button.addEventListener('click', handleShowMore)

// trying to create a list of genres to select from that goes in search menu dropdown
// genres = document.createDocumentFragment()
// element = document.createElement('option') // first default option to be added
// element.value = 'any'
// element = 'All Genres' 
// genres.appendChild(element) 

// for ([id, name]; Object.entries(genres); i++) { 
//     document.createElement('option')
//     element.value = value
//     element.innerText = text // where do value and text come from?
//     genres.appendChild(element)
// }
// // for loop not structured correctly, destructuring needs to go into loop, i is not initialized, length not set

// changed variable name to genreList, since genres object already exists, don't want to overwrite
// also changed generic element variable to genreElement
let genreList = document.createDocumentFragment()
let genreElement = document.createElement('option')
genreElement.value = 'any'
genreElement.textContent = 'All Genres'
genreList.appendChild(genreElement)

// changed to for..of loop to ensure iterates over entire array
for ( let item of Object.entries(genres)) {
    let genreElement = document.createElement('option')
    let [ genreId, genreName ] = item
    genreElement.value = genreId
    genreElement.textContent = genreName
    genreList.appendChild(genreElement)
}

// data-search-genres.appendChild(genres) 
// doesn't use doc query selector, changed to:
document.querySelector('[data-search-genres]').appendChild(genreList) //TODO: UPDATE TO USE OBJECT MAP

// // trying to create a list of authors to select from that goes in search menu dropdown
// // will be similar to genres list above
// authors = document.createDocumentFragment()
// element = document.createElement('option')
// element.value = 'any'
// element.innerText = 'All Authors'
// authors.appendChild(element)

// for ([id, name];Object.entries(authors); id++) {
//     document.createElement('option')
//     element.value = value
//     element = text
//     authors.appendChild(element)
// }

// data-search-authors.appendChild(authors)

let authorsList = document.createDocumentFragment()
let authorElement = document.createElement('option')
authorElement.value = 'any'
authorElement.textContent = 'All Authors'
authorsList.appendChild(authorElement)

for ( let item of Object.entries(authors)) {
    let authorElement = document.createElement('option')
    let [ authorId, authorName ] = item
    authorElement.value = authorId
    authorElement.textContent = authorName
    authorsList.appendChild(authorElement)
}

document.querySelector('[data-search-authors]').appendChild(authorsList) //TODO: UPDATE TO USE OBJECT MAP


// // extracts data from search form, applies filters
// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book) // if matches criteria, push to result array
//     }

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
//     // if no results, display no results message

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1]) // what is this range??? what is source?

//     // creates list preview (summary)
//      // placed within createPreviews function
//     for ({ author, image, title, id }; extracted; i++) { // for loop not structured correctly again
//         const { author: authorId, id, image, title } = props // would it be props or extracted?

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         // need something like this for basic preview
//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments) // fragments doesn't exist, fragment?
    
//     //
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false 
//     // can perhaps set up a togglable bevaiour for open being true or false? would rather use handlers like prev project
// }


// // when clicking on list item, should open close-up preview
// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;
        // used alt method of finding closest element with list-preview data attribute

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }

const css = {
    day: {
        dark: '10, 10, 20',
        light: '255, 255, 255',
    },
    night: {
        dark: '255, 255, 255',
        light: '10, 10, 20',
    }
}

const handleSettingsSubmit = (event) => {
    html.settings.overlay.style.display = 'none'
    event.preventDefault()

    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    document.documentElement.style.setProperty('--color-dark', css[theme].dark)
    document.documentElement.style.setProperty('--color-light', css[theme].light)

}
html.settings.form.addEventListener('submit', handleSettingsSubmit)

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.style.setProperty('--color-dark', css.night.dark)
    document.documentElement.style.setProperty('--color-light', css.night.light)
}
else {
    document.documentElement.style.setProperty('--color-light', css.day.dark)
    document.documentElement.style.setProperty('--color-light', css.day.light)
}

// data-settings-theme.value === window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
// v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' | 'day'

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);

// // handles theme menu settings submission
// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }
