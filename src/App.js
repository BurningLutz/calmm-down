import React, { PureComponent } from 'react'
import Atom from 'kefir.atom'

import loadable from './common/loadable'
const Counter = loadable(() => import(/* webpackChunkName: "Counter" */ './components/Counter'))

export default class App extends PureComponent {
  state = {
    count0: Atom(0),
    count1: Atom(0),
  }

  render() {
    const { count0, count1 } = this.state

    return (
      <div>
        <Counter count={count0} />
        <Counter count={count1} />
      </div>
    )
  }
}

App.propTypes = {
}
