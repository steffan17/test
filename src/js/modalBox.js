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
            closeModalBox()
        })
        document.getElementById('modalBoxFormSaveButton').addEventListener('click', ()=>{
            if(button.className=='editButton')
            { 
                saveEditBox(modalBox, button)
            }
        })
    }
}

const closeModalBox = () =>{
    const container = document.getElementById('container')
    const modalBox = document.getElementById('myModalBox').parentNode
    document.getElementById('myModalBox').style.display="none"
            container.removeChild(modalBox)
}

const showEditBox = (modalBox, editButton)=>{

    const headerElement =document.getElementById('tableHeader')

    const listOfAreas = [...headerElement.children[0].children]
    const row = [...editButton.parentElement.parentElement.children]
  
    


    const renderEditForm = (listOfAreas, row)=>{
        let renderedHTML = []

        for(let i=0;i<listOfAreas.length;i++)
        {
            let formRow = `<div class='modalBox-formRow'>`
            formRow += `<label for="input-${listOfAreas[i].textContent}" class="modalBox-formRowLabel">${listOfAreas[i].textContent}</label><span> </span>`
            formRow += `<input type="text" id="input-${listOfAreas[i].textContent}" class="modalBox-formRowTextBox" name="${listOfAreas[i].textContent}" value="${row[i].textContent}" >`
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
                   
                <div id='modalBoxFormSaveButton' class='modalBox-formSaveButton'>Zapisz</div>
            </div>
                      
        </div>
    </div>`
}

const saveEditBox = (modalBox, editButton) =>{

    

    const headerElement =document.getElementById('tableHeader')
    const tableName = document.getElementById('tableTable').caption.innerHTML

    const listOfAreas = [...headerElement.children[0].children]
    const row = [...editButton.parentElement.parentElement.children]

    const listOfAreasTable =[] 
    const originalValues = []
    const changedValues =[]

    for(let i=0; i<listOfAreas.length;i++)
    {
        listOfAreasTable.push(listOfAreas[i].textContent)
        originalValues.push(row[i].textContent)
        changedValues.push(document.getElementById(`input-${listOfAreas[i].textContent}`).value)
    }



    const result = {
        listOfAreasTable,
        originalValues,
        changedValues}

    console.log(JSON.stringify(result))
    closeModalBox()
}
