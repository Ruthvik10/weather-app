const express=require('express');
const path=require('path');
const hbs=require('hbs');
const app=express();
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const publicDirectoryPath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Ruthvik K S',
        message:'Use this app to get the weather info'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Ruthvik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'If something goes wrong contact the help desk',
        name:'Ruthvik'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:"Address not specified"
        })
    }
   geocode(req.query.address,(error,response)=>{
       if(error){
           return res.send({
               error:error
           })
       }
       forecast(response,(error,response)=>{
           if(error){
               return res.send({
                   error:err
               })
           }
           res.send({
               summary:response.summary,
               temperature:response.temperature,
               rain:response.precipProbability *100 + '%'
           })
       })

   })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help page not found',
        name:'Ruthvik'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found',
        name:'Ruthvik'
    })
})
app.listen(3000,()=>{
    console.log("Started server at port 3000");
})