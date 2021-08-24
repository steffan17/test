module.exports={
    showDialogBox: function(e)
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
                    <span id='closeModalBox' class='closeModalBox'>&times;</span>
                    <p>Some text in the Modal..</p>
                </div>
            </div>`
        }

        container.appendChild(modalBox)

        document.getElementById('myModalBox').style.display="block"
        document.getElementById('closeModalBox').addEventListener('click', ()=>{
            document.getElementById('myModalBox').style.display="none"
        })
    }
}


