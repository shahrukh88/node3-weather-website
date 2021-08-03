const request = require('request')

const forecast=(latitude,longitude,callback)=>{
    const url ='https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=1h&units=metric&apikey=dIVyE7tTvTbKFyXtGZ3XTjkj45Yj5f0K'
    request({url:url, json:true},(error,response)=>{
  
        if(error){

            callback('unable to connect  to weather services ',undefined)
          }
          else if(response.body.error){
        
            callback('unable to find location ',undefined)
          }
          else{
              callback(undefined,{

                curentlocation:response.body.data.intervals
            
            })
            
          }
    })

}
module.exports=forecast