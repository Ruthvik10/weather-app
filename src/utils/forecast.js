const request=require('request');
const forecast=({latitude,longitude},callback)=>{
  const url=`https://api.darksky.net/forecast/780ede811bff1badcd6687a0ceb66f36/${latitude},${longitude}`;
    request({url:url,json:true},(error,response)=>{
      if(error){
        callback('Unable to connect to weather service',undefined);
      }
      else if(response.body.error){
        callback('Unable to get location',undefined);
      }
      else{
        callback(undefined,response.body.currently)
      }
     
})
}
module.exports=forecast;