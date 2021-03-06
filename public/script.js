const form = document.querySelector('form')
const address = document.querySelector('#address')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = address.value
    msg1.textContent='Loading...'
    msg2.textContent=""
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msg1.textContent = data.error    
            }else{
                msg1.textContent=data.location
                msg2.textContent=data.forecast
            }
            
        })
    })
})
 
   

