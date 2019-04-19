console.log("Client side js");

document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=document.querySelector('#location').value;
    fetch(`/weather?address=${location}`)
    .then((response)=>{
        response.json()
        .then((data)=>{
            if(!data.error){                 
                document.getElementById('forecast').innerText="Forecast : "+data.summary+"\nTemperature : "+data.temperature+ "\nRain : "+data.rain;
                console.log(document.getElementById('forecast'))
            }   
            else{
                document.getElementById('forecast').innerText=data.error;
            }
        })
    })
    
})