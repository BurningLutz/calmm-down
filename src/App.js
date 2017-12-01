import React, { PureComponent } from 'react'
import Atom from 'kefir.atom'

window.Atom = Atom
import * as L from 'partial.lenses'
window.L = L
import * as U from 'karet.util'
window.U = U
import * as R from 'ramda'
window.R = R

import loadable from './common/loadable'
const Counters = loadable(() => import(/* webpackChunkName: "Counters" */ './components/Counters'))

export default class App extends PureComponent {
  state = {
    counters: Atom([])
  }

  componentDidMount() {
    this.state.counters.log('current counters')
  }

  render() {
    return (
      <Counters {...this.state} />
    )
  }
}
