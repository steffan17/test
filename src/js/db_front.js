const modalBox = require('./modalBox')

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



