//require all modules
let express = require('express');//to create web apps
var exphbs = require('express-handlebars');//to render templates
const bodyParser = require('body-parser');//require body parser for htm functionality
const flash = require('express-flash');
const session = require('express-session');

//instantiate 
let app = express();

//setup handlebars ,Body-parser and public
app.engine('handlebars', exphbs({ layoutsDir: './views/layouts' }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'my express flash string',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));//to use css
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function(req,res){
res.render("home")
})

app.post('/info', function(req, res){
var login = req.body.login
var password = req.body.password

if(login === "" && password === ""){
req.flash('error', 'Enter values!')
}

console.log(login, password)
res.render("home")
})

app.get('/signup', function(req, res){
res.render("signup")
})




//Port setup
const PORT = process.env.PORT || 8002;

app.listen(PORT, function () {
    console.log('App starting on port :' + PORT);
});