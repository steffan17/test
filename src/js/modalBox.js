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
            let formRow = `<div class='modalBoxFormRow'>`
            formRow += `<label for="${listOfAreas[i].textContent}" class="modalBoxFormRowLabel">${listOfAreas[i].textContent}</label><span> :  </span>`
            formRow += `<input type="text" id="${listOfAreas[i].textContent}" class="modalBoxFormRowTextBox" name="${listOfAreas[i].textContent}" value="${row[i].textContent}" >`
            formRow += `</div>`
            renderedHTML.push(formRow)
            
        }
        return renderedHTML

    }

    

    modalBox.innerHTML = `
    <div id='myModalBox' class='modalBox'>
        <div class='modalBox-content'>
            <span id='closeModalBox' class='closeModalBox'>&times;</span>
            <div id='modalBoxForm'>
                <div id='modalBoxFormHeader'>Edytuj</div> 
                <div class='modalBoxFormRow'>
                    
                    ${renderEditForm(listOfAreas, row).map(e=>{return e}).join('')}
                   
                </div>
                <div id='modalBoxFormSaveButton' class='modalBoxFormSaveButton'>Zapisz</div>
            </div>
                      
        </div>
    </div>`
}
