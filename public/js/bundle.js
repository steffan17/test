/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (() => {


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
        const editButtons = [...document.getElementsByClassName('editButton')].map(e=>{e.addEventListener('click',()=>showDialogBox(e))})
        const deleteButtons = [...document.getElementsByClassName('deleteButton')].map(e=>{e.addEventListener('click',()=>showDialogBox(e))})
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
   
    <thead> 
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

const showDialogBox = function(e)
{
    console.log(e.dataset.id)
    console.log(e.className)
    const tableName = document.getElementById('tableTable').caption.innerHTML
    console.log(tableName)
    const container = document.getElementById('container')
    const modalBox = document.createElement('div')
    modalBox.addClass='modalBox'

    if(e.className=='editButton')
   { 
        modalBox.innerHTML = `
        <div id='myModalBox' class='modalBox'>
            <div class='modalBox-content'>
                <span class='closeModalBox'>&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </div>`
    }

    container.appendChild(modalBox)

    document.getElementById('myModalBox').style.display="block"

}

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
})();

/******/ })()
;