const testButton  = document.getElementById('forTests').addEventListener('click', ()=>{

    const x = screen.width
    const y = screen.height

    alert(`szerokosc: ${x} wysokosc: ${y}`)
    console.log(testFunction())

})

const testFunction = ()=>{
    const a = 90
    const b = 120

    return a+b 
}

