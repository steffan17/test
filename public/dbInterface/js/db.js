
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
        <ul>
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
        console.log(tableNameButton)
        const tableNamesArray= [...tableNameButton].map((e)=>{e.addEventListener('click', ()=>{showTheTable(e.attributes.name.value)})})
    })
}

showTables()

const showTheTable = (tableName)=>{

    console.log(tableName)
    fetch(`/api/showTheTable?tableName=${tableName}`)

}