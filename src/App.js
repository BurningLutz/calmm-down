import React, { PureComponent } from 'react'

import loadable from './common/loadable'
const Workspace = loadable(() => import(/* webpackChunkName: "Workspace" */ './components/Workspace'))

export default class App extends PureComponent {
  render() {
    return (
      <Workspace />
    )
  }
}

App.propTypes = {
}
