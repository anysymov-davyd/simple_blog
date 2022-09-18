const
    express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    exphbs = require('express-handlebars'),
    hbs = exphbs.create({
        defaultLayout: 'main',
        extname: 'hbs'
    })
    DB = 'mongodb+srv://Anisimov:bqKyflhcZum0s065@cluster.7eln7zi.mongodb.net/?retryWrites=true&w=majority',
    PORT = process.env.PORT || 3000,
    routes = require('./routes/router.js'),
    path = require('path'),
    bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))

app.use(routes)


async function start() {
    try {
        await mongoose.connect(DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            
            () => {
                console.log(`Connecting to database...`)
            }
        )
  
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`)
        })

    } catch (error) {
        console.error(error)
    }
}

start()