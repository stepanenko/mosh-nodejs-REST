
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const startupDebugger = require('debug')('app:startup');   // or just one with name 'debug'
const dbDebugger = require('debug')('app:db');   // to run both 'DEBUG=app:*'
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');   // is set by default and not required

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);   // by default 'undefined'
// console.log(`App: ${app.get('env')}`);   // prod or dev...

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   // key=value&key=value
app.use(express.static('public'));
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
startupDebugger('App Name: ' + config.get('name'));
startupDebugger('App Mail Server: ' + config.get('mail.host'));
startupDebugger('App Mail Password: ' + config.get('mail.password'));   // was set from terminal with 'export app_password=1234'

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan is enabled...');   // better than console.log()
}

// DB Work ...
dbDebugger('Connected to DB...');


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}...`));
