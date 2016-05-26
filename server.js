import React from 'react'
// для сервер-рендеринга
import { renderToString } from 'react-dom/server'
import { RouterContext, match } from 'react-router'

import { Provider } from 'react-redux'
import configureStore  from './src/store'

import mongoose from 'mongoose'

import path from 'path'
import webpack from 'webpack'
import config from './webpack.config'
import bodyParser from 'body-parser'

import express from 'express'
const app = express();

mongoose.connect('mongodb://localhost/reactProject', (err, res) => {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err)
  } else {
    console.log('Connected to Database')
  }
})

// настройки для вебпака и dev-server'a
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

// подключаем ejs шаблоны
app.set("views", path.resolve('views'))
app.set('view engine', 'ejs')

// путь к статическим файлам
app.use('/build', express.static(path.resolve('build')))

app.use(bodyParser.urlencoded({ extended: true })) 
app.use(bodyParser.json())

// server routes
require('./api')(app)

// react-router routes
const routes = require('./src/routes')

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if(error) {
      res.status(500).send(error.message)
    } else if(redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if(renderProps) {
      const store = configureStore()
      
      fetchAll(store, renderProps).then(() => {
        render(res, store, renderProps)
      }).catch(response => {
        res.status(500).send("Something went wrong!");
      })
    } else {
      res.status(404).send('Not found')
    }
  })
})

function fetchAll(store, routerState) {
  const promiseList = routerState.components.map(componentClass => {
    if(componentClass.fetchData) {
      return componentClass.fetchData(store.dispatch, routerState.params)
    }
  })
  
  return Promise.all(promiseList)
}

function render(res, store, renderProps) {
  const finalState = JSON.stringify(store.getState())
  
  res.render('index', {
    content: renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    ),
    initialState: finalState
  })
}

app.listen(3000, 'localhost', (err) => {
  if(err) 
    return console.log(err)
  
  console.log('Listening at http://localhost:3000')
})