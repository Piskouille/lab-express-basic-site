const express = require("express")
const axios = require('axios')
const hbs = require("hbs")
const pictures = require('./pictures')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(__dirname + "/public"))

hbs.registerPartials(__dirname + '/views/partials')


const picturesDog = []
for(let i = 0; i < 10; i++){
    axios.get("https://dog.ceo/api/breeds/image/random")
        .then(res => {
            // console.log(res.data)
            picturesDog.push({src: res.data.message, name: res.data.status})
        })
}


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
        pictures: picturesDog
    })
})

app.listen(8080, () => console.log("Server is listening"))