const express = require("express")
const axios = require('axios')
const hbs = require("hbs")
const authKey = process.env.UNSPLASH_API_AUTH
const secretKey = process.env.UNSPLASH_API_SECRET_KEY
const app = express()

app.set('view engine', 'hbs')
app.use(express.static(__dirname + "/public"))

hbs.registerPartials(__dirname + '/views/partials')



let pictures = []
 const fetchUnsplash = async () => {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
        headers: {
            Authorization: `Client-ID PifXiRuHpGmHdGDEEnuXPrq1RTLkWKcUdTUPcGYHiVk` 
        },
        params: {
            orientation: "squarish",
            query: "landscape",
            count: 25,
            w: 576,
            h: 576, 
            fit: "crop",
            dpr: 2
        }
    })  

    pictures = response.data.map(res => {
        return {
            url: res.urls.regular, 
            author: res.user.name}
    }) 
}


fetchUnsplash()  

/* const fetchPixabay = async () => {
    const response = await axios.get("https://pixabay.com/api/" ,{
        params : {
            key: "22568889-ee2675af8f619367c0d472043",
            q: "landscape",
            image_type: "photo",
            orientation: "horizontal",
            min_width: "400px",
            per_page: 10
        }
    })
    
    pictures = response.data.hits.map(res => {
        return {
            url: res.userImageURL, 
            name: res.tags.split(', ')[0]
        }
    })
}

fetchPixabay() */


app.get('/', (req, res, next) => {
    res.render("home.hbs", {
        css: ["/styles/main.css", "/styles/home.css"]
    })
})
app.get('/about', (req, res, next) => {
    res.render("about.hbs", {
        css: ["/styles/main.css"]
    })
})
 app.get('/gallery', (req, res, next) => {
    res.render("gallery.hbs", {
        css: ["/styles/main.css", "/styles/pictures.css"],
        pictures: pictures
    })
}) 

app.listen(8080, () => console.log("Server is listening"))