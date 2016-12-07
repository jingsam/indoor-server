const express = require('express')
const compression = require('compression')
const helmet = require('helmet')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const config = require('./config')
const router = require('./router')

// 连接数据库
require('./db')

const app = express()
app.set('json spaces', 2)

app.use(compression())
app.use(helmet())
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride())
app.use(cookieParser())
app.use(express.static('public'))

app.use('/api/v1', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.json({
    error: app.get('env') === 'development' ? err : '',
    message: err.message
  })
})


module.exports = app
