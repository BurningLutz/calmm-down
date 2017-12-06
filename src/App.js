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
const Board = loadable(() => import(/* webpackChunkName: "Board" */ './components/Board'))

export default class App extends PureComponent {
  state = {
    game: U.atom({
      squares: new Array(9),
      isXNext: true
    })
  }

  componentDidMount() {
    this.state.game.log('game')
  }

  render() {
    return (
      <Board {...this.state} />
    )
  }
}
