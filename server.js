const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

//Route files
const bootcamps = require('./routes/bootcamps')

//load env vars
dotenv.config({path: './config/config.env'});

// connect to database
connectDB();

// Handle unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    //Close server & exit process
    process.exit(1);
})

const app = express();

//Body parser
app.use(express.json());

// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// };
// app.use(logger);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} in PORT ${PORT}.`));

