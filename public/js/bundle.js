/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const modalBox = __webpack_require__(2)

console.log(`It's working :-)`)

const button = document.getElementById('button')
const querry = document.getElementById('sqlQuerry')
button.addEventListener('click', ()=>console.log(querry.value))

const querryForm = document.getElementById('sqlQuerryForm').addEventListener(
    'submit', evt => {
        evt.preventDefault();
        const form = evt.target
        const body = JSON.stringify({
            querry: form.elements.querry.value
        })
        const headers = { 'Content-Type': 'application/json' }

        fetch('/api/db', { method: 'post', body, headers })
            .then(resp => {
            if(resp.status < 200 || resp.status >= 300)
            throw new Error(`Żądanie zakończyło się niepowodzeniem ${resp.status}`)
            return resp.json()
            })
            .then(json => {
            console.log(json)
            })
            .catch(err => {
            console.log('ERROR')

            })          

    }
)



const renderHTMLTableNames = function(array)
{
    return `
        <ul id='tablesList' class='tablesList'>
        ${array.map((tableName)=>{
            return `
            <li class='tableName' name='${tableName}'>${tableName}</li>`
        }).join('')}
        </ul>
        <div id='tableContent' class='tableContent'></div>`
}

const result = document.getElementById('result');

const showTables = function()
{
    fetch('/api/showTables').then(res => res.json()).then(data => {
        result.innerHTML=renderHTMLTableNames(data)
        const tableNameButton = document.getElementsByClassName('tableName')
        const tableNamesArray= [...tableNameButton].map((e)=>{e.addEventListener('click', ()=>{showTheTable(e.attributes.name.value)})})
    })
}

showTables()

const showTheTable = (tableName)=>{

    fetch(`/api/showTheTable?tableName=${tableName}`).then(res => res.json()).then(data => {
        const tableContent = document.getElementById('tableContent')
        tableContent.innerHTML=renderTableHTML(tableName, data)
        const editButtons = [...document.getElementsByClassName('editButton')].map(editButton=>{editButton.addEventListener('click',()=>modalBox.showDialogBox(editButton))})
        const deleteButtons = [...document.getElementsByClassName('deleteButton')].map(deleteButton=>{deleteButton.addEventListener('click',()=>modalBox.showDialogBox(deleteButton))})
     })

}

const renderTableHTML = function(tableName, array)
{
   
    if(array.info.countRecords)
    {
    const tableNames = [] 
    Object.keys(array.records[0]).map((e) => {tableNames.push(e)})
    
    return `
    <table id='tableTable' class='tableTable'>
    <caption>${tableName}</caption>
   
    <thead id='tableHeader'> 
    ${tableNames.map(e =>{return `<th>${e}</th>`}).join('')}
    </thead>
    ${array.records.map(arrayMap => {
        
        return `<tr>
            ${tableNames.map(tableNamesMap => {

                return `<td id='${tableNamesMap}'>${arrayMap[tableNamesMap]}</td>`

            }).join('')}
        <td><div id='ID${arrayMap[tableNames[0]]}' data-id='${arrayMap[tableNames[0]]}' class='editButton'><img src=../img/icoEdit.png width=20px></div></td>
        <td><div id='ID${arrayMap[tableNames[0]]}' data-id='${arrayMap[tableNames[0]]}' class='deleteButton'><img src=../img/icoDelete.png width=20px></div></td>
        </tr>`

    }).join('')}
    </table>`
    }else return `<table id='tableTable' class='tableTable'>
    <caption>${tableName}</caption>
   
    <thead> 
    ${array.collumnNames.map(e =>{return `<th>${e}</th>`}).join('')}
    </thead>
    <tr><td>Pusta Tabela</td></tr>`

    
}





/***/ }),
/* 2 */
/***/ ((module) => {

module.exports={
    showDialogBox: function(button)
    {
        console.log(button.dataset.id)
        console.log(button.className)
        const tableName = document.getElementById('tableTable').caption.innerHTML
        console.log(tableName)
        const container = document.getElementById('container')
        const modalBox = document.createElement('div')
        modalBox.addClass='modalBox'

        if(button.className=='editButton')
    { 
            
            showEditBox(modalBox, button)
        }

        container.appendChild(modalBox)

        document.getElementById('myModalBox').style.display="block"
        document.getElementById('closeModalBox').addEventListener('click', ()=>{
            document.getElementById('myModalBox').style.display="none"
            container.removeChild(modalBox)
        })
    }
}

const showEditBox = (modalBox, editButton)=>{

    const headerElement =document.getElementById('tableHeader')
    const headerChildNumber = headerElement.childElementCount
    const tableName = document.getElementById('tableTable').caption.innerHTML

    sqlQuerrySelect = `SELECT * FROM ${tableName} WHERE id = ${editButton.dataset.id}`

    const listOfAreas = [...headerElement.children[0].children]
    const row = [...editButton.parentElement.parentElement.children]
    console.log(listOfAreas.length)
    


    const renderEditForm = (listOfAreas, row)=>{
        let renderedHTML = []

        for(let i=0;i<listOfAreas.length;i++)
        {
            let formRow = `<div class='modalBox-formRow'>`
            formRow += `<label for="${listOfAreas[i].textContent}" class="modalBox-formRowLabel">${listOfAreas[i].textContent}</label><span>  </span>`
            formRow += `<input type="text" id="${listOfAreas[i].textContent}" class="modalBox-formRowTextBox" name="${listOfAreas[i].textContent}" value="${row[i].textContent}" >`
            formRow += `</div>`
            renderedHTML.push(formRow)
            
        }
        return renderedHTML

    }

    

    modalBox.innerHTML = `
    <div id='myModalBox' class='modalBox'>
        <div class='modalBox-content'>
            <span id='closeModalBox' class='closeModalBox'>&times;</span>
            <div id='modalBoxForm' class='modalBox-form'>
                <div id='modalBoxFormHeader' class='modalBox-formHeader'>Edytuj</div> 
                                  
                    ${renderEditForm(listOfAreas, row).map(e=>{return e}).join('')}
                   
                <div id='modalBoxFormSaveButton' class='modalBoxFormSaveButton'>Zapisz</div>
            </div>
                      
        </div>
    </div>`
}


/***/ }),
/* 3 */
/***/ (() => {

const testButton  = document.getElementById('forTests').addEventListener('click', ()=>{

    const x = screen.width
    const y = screen.height

    alert(`szerokosc: ${x} wysokosc: ${y}`)

})

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

__webpack_require__(1)
__webpack_require__(3)
})();

/******/ })()
;