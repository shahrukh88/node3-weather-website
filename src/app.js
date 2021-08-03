const path = require('path')
const express = require('express')
const  hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//define path for express config
const app =express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const patialsPath = path.join(__dirname,'../templates/partials')

//setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(patialsPath)
//setup static dricteory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'shahrukh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'shahrukh'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'shahrukh'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
      title:'404',
      name:'shahrukh khan',
      errorMessage:'Help Article not found'

})
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'you must provide address'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{

        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
        res.send({
            products:[]
        })
    
})

app.get('*',(req,res)=>{
    res.render('404',{
      title:'404',
      name:'shahrukh khan',
      errorMessage:'Page not found'

})
})

app.listen(3000,()=>{
    console.log('server port up listining 3000')
})