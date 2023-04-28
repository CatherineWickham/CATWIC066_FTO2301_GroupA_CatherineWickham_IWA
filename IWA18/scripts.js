// Import all variables/ functions from other js files
import { updateDragging, createOrderData, state } from './data.js'
import { updateDraggingHtml, createOrderHtml, moveToColumn, html  } from './view.js'

/**
 * A handler that fires when a user drags over any element inside a column. In
 * order to determine which column the user is dragging over the entire event
 * bubble path is checked with `event.path` (or `event.composedPath()` for
 * browsers that don't support `event.path`). The bubbling path is looped over
 * until an element with a `data-area` attribute is found. Once found both the
 * active dragging column is set in the `state` object in "data.js" and the HTML
 * is updated to reflect the new column.
 *
 * @param {Event} event 
 */
const handleDragOver = (event) => {
    event.preventDefault();
    const path = event.path || event.composedPath()
    let column = null

    for (const element of path) {
        const { area } = element.dataset
        if (area) {
            column = area
            break;
        }
    }

    if (!column) return
    updateDragging({ over: column })
    updateDraggingHtml({ over: column })
}

// declare draggingId to be used in handleDragStart and handleDragEnd
let draggingId = null

const handleDragStart = (event) => {
    // extract target property from event
    const { target } = event 

    // sets id of element being dragged to id of target element
    draggingId = target.dataset.id 

    // set source of dragging object to id of element being dragged
    // doesn't have functionality - just keeps state object up to date
    state.dragging.source = draggingId 
}

const handleDragEnd = (event) => {
    // changes the column of the dropped item
    // id obtained from variable set in handleDragStart
    // destination column obtained from dragged over property in state object
    moveToColumn(draggingId, state.dragging.over)

    // reset all state properties and draggingId, since item has been dropped
    // keeps state object up to date
    draggingId = null 
    state.dragging.source = null
    state.dragging.over = null

    // over not specified in updateDraggingHtml - clears all hover effects
    updateDraggingHtml ({ over: null }) 
}

const handleHelpToggle = (event) => {
    const { target } = event 

    // check source of event, if from clicking help button, shows overlay
    // if from pressing cancel button, hides overlay and focuses on add button
    // checks content of data-set to determine which is which
    // Object.keys returns keys as an array of strings, need to access first and only index
    if (Object.keys(target.dataset)[0] === "help") {
        html.help.overlay.style.display = 'block'
    }
    if (Object.keys(target.dataset)[0] === "helpCancel") {
        html.help.overlay.style.display = 'none'
        document.querySelector('[data-add]').focus()
    }
}

const handleAddToggle = (event) => {
    const { target } = event 
    
    // same as helpToggle above, with exception that form needs to be reset on cancelling
    if (Object.keys(target.dataset)[0] === "add") {
        html.add.overlay.style.display = 'block'
    }
    if (Object.keys(target.dataset)[0] === "addCancel") {
        html.add.overlay.style.display = 'none'
        html.add.form.reset()
        document.querySelector('[data-add]').focus()
    }
}

const handleAddSubmit = (event) => {
    html.add.overlay.style.display = 'none' // hides overlay
    event.preventDefault() // prevents input data in form being cleared on submit
    
    // extract input data from form
    const formData = new FormData(event.target) 
    const enteredData = Object.fromEntries(formData)
    
    // create order data directly from the event object
    const data = createOrderData(event.target)
    // update the automatically created info with the user's input data
    data.title = enteredData.title
    data.table = enteredData.table
    data.column = 'ordered' // since order is being created, goes into ordered
    state.orders = { [data.id]: data } // saves data in state using ID as key to allow easy access for editing

    // create HTML from order data
    const orderHtml = createOrderHtml(data)
    // adds the new HTML element to the ordered column
    document.querySelector('[data-column="ordered"]').appendChild(orderHtml)
    
    event.target.reset() // clears info in form

    document.querySelector('[data-add]').focus() // refocuses on add button
}

// declare editId to be used in handleEditToggle and handleEditSubmit
let editId = null

const handleEditToggle = (event) => {
    const { target } = event 
    html.edit.overlay.style.display = 'block' // displays Edit overlay
    
    // same as addToggle above
    if (Object.keys(target.dataset)[0] === "editCancel") {
        html.edit.overlay.style.display = 'none'
        html.edit.form.reset()
        document.querySelector('[data-add]').focus()
    }

    // sets id of element selected to be modified
    editId = target.closest('[data-id]').dataset.id
}

const handleEditSubmit = (event) => {
    html.edit.overlay.style.display = 'none' // hides overlay
    event.preventDefault() // prevents input data in form being cleared on submit
    
    const formData = new FormData(event.target) // extracts input data
    const enteredData = Object.fromEntries(formData)

    // id set in handleEditToggle used as key to access info stored in state object for that order
    const editedData = state.orders[editId]
    // new user-entered info stored in editedData variable
    editedData.title = enteredData.title
    editedData.table = enteredData.table
    editedData.column = enteredData.column

    // create new HTML using edited info
    const editedHtml = createOrderHtml(editedData)
    
    // update existing DOM node with new edited HTML
    // use data-id to find correct element
    // replaceChild used to overwrite - needs both parent and child nodes to be specified
    // used closest data-column to get parent element
    const nodeToEdit = (document.querySelector(`[data-id="${editId}"]`)).closest('[data-column]')
    const childOfNodeToEdit = (document.querySelector(`[data-id="${editId}"]`))
    nodeToEdit.replaceChild(editedHtml, childOfNodeToEdit)

    // moves the edited element to the newly specified column
    moveToColumn(editId, editedData.column)

    event.target.reset() // clear info in form

    document.querySelector('[data-add]').focus() // refocus on add button
}

const handleDelete = (event) => {
    html.edit.overlay.style.display = 'none' // hide edit overlay

    // find correct node to be deleted using id of element to be edited
    const nodeToDelete = (document.querySelector(`[data-id="${editId}"]`))
    nodeToDelete.remove()

    // remove order from the state object to keep it up to date
    delete state.orders[editId]

    event.target.reset() // clear info in edit form if any was entered
}

html.add.cancel.addEventListener('click', handleAddToggle) 
html.other.add.addEventListener('click', handleAddToggle)
html.add.form.addEventListener('submit', handleAddSubmit)

html.other.grid.addEventListener('click', handleEditToggle)
html.edit.cancel.addEventListener('click', handleEditToggle)
html.edit.form.addEventListener('submit', handleEditSubmit)
html.edit.delete.addEventListener('click', handleDelete)

html.help.cancel.addEventListener('click', handleHelpToggle)
html.other.help.addEventListener('click', handleHelpToggle)

for (const htmlColumn of Object.values(html.columns)) {
    htmlColumn.addEventListener('dragstart', handleDragStart)
    htmlColumn.addEventListener('dragend', handleDragEnd)
}

for (const htmlArea of Object.values(html.area)) {
    htmlArea.addEventListener('dragover', handleDragOver)
}