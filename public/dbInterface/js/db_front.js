
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
        </ul>`
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
        const existTableContent = document.getElementsByClassName('tableContent')
        
        if(existTableContent.length){
            existTableContent.innerHTML='ale'
            console.log(existTableContent)
            }
        const tableContent = document.createElement('div')
        tableContent.className = 'tableContent';
        tableContent.innerHTML=renderTableHTML(tableName, data)
        result.appendChild(tableContent)
        const showTableBack = document.getElementById('showTableBack').addEventListener('click', ()=>showTables())

    })

}

const renderTableHTML = function(tableName, array)
{
   
    
    const tableNames = [] 
    Object.keys(array[0]).map((e) => {tableNames.push(e)})
    
    return `
    <div id=showTableBack><<<<<</div>
    <table id='tableTable' class='tableTable'>
    <caption>${tableName}</caption>
   
    <thead> 
    ${tableNames.map(e =>{return `<th>${e}</th>`}).join('')}
    </thead>
    ${array.map(arrayMap => {
        
        return `<tr>
            ${tableNames.map(tableNamesMap => {

                return `<td>${arrayMap[tableNamesMap]}</td>`

            }).join('')}
        <td><div id=editButton><img src=../img/icoEdit.png width=20px></div></td>
        <td><div id=editButton><img src=../img/icoDelete.png width=20px></div></td>
        </tr>`

    }).join('')}
    </table>`
    
}

