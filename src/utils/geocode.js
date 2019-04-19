const request=require('request');
const geocode=(address,callback)=>{
  const geocodingUrl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicnV0aHZpazEwIiwiYSI6ImNqdTR6YjN3bjEzY2I0NHIxaWoweXNsdWIifQ.6X1xQ8boz9nBS4-g11OGBg&limit=1`
  console.log(geocodingUrl)
  request({url:geocodingUrl,json:true},(error,response)=>{
    if(error){
      callback('Unable to connect to locaion service',undefined)
    }
    else if(response.body.features.length===0){
      callback('Unable to find location',undefined)
    }else{
      var longitude=response.body.features[0].center[0];
      var latitude=response.body.features[0].center[1];
      var location=response.body.features[0].place_name;
      callback(undefined,{
        latitude,
        longitude,
        location
      });
    }
    
  })
}
module.exports=geocode;