//=================================================================
// Dependencies
//=================================================================
const express = require('express');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');

// const db = require("./app/models"); db connect



//=================================================================
// Initialize new Express app
//=================================================================
const app = express();

// =================================================================
// Use logger middleware so 💩💩💩💩 prints to the console.
// =================================================================
app.use(logger('dev'));

// =================================================================
// Configure body-parser middleware
// =================================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//=================================================================
// Configure method-override middleware
//=================================================================
app.use(methodOverride("_method"));

// =================================================================
// Handlebars view engine setup
// =================================================================
const handlebarsHelpers = require('./app/views/helpers/global-helpers');

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './app/views/layouts/',
    partialsDir: './app/views/partials/',
    helpers: handlebarsHelpers
}));

app.set('view engine', '.hbs');
app.set('views', 'app/views/');

const session = require('express-session');
const passport = require('passport');
// require('./app/config/passport.js')(passport);
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


const PORT = process.env.PORT || 8080;

//=================================================================
// Serve static assets from /public route
//=================================================================
app.use('/public', express.static('./app/public/'));



//=================================================================
// Configure route controllers
//=================================================================
require('./app/controllers/html-routes')(app);
require('./app/controllers/api-routes')(app);
// require('./app/controllers/routes')(app, passport);

// ================================================================
// Catch 404 errors, render 404 page with message.
// ================================================================
app.use((req, res) => {
    res.status(404).render('404', { message: 'Page Not Found' });
});

//=================================================================
// Grab env port and start listening on all network interfaces
//=================================================================

// db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
// });
