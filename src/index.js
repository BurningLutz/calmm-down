import React from 'react'
import { render } from 'react-dom'
import './polyfill'

import App from './App'

import 'normalize.css'
import 'style/app.scss'

render(
  <App />,
  document.getElementById('root')
)
