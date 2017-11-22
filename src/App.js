import React, { PureComponent } from 'react'
import Atom from 'kefir.atom'

import loadable from './common/loadable'
const CartExample = loadable(() => import(/* webpackChunkName: "CartExample" */ './components/CartExample'))

export default class App extends PureComponent {
  state = {
    products: Atom([
      {id: 1, name: 'Sinertävä lenkki 500g'},
      {id: 2, name: 'Maksainen laatikko 400g'},
      {id: 3, name: 'Maitoa etäisesti muistuttava juoma 0.9l'},
      {id: 4, name: 'Festi moka kaffe 500g'},
      {id: 5, name: 'Niin hyvä voffeli ettei saa 55g'},
      {id: 6, name: 'Suklainen Japanilainen viihdyttäjä 37g'}
    ])
  }

  componentDidMount() {
    this.state.products.log()
  }

  render() {
    return (
      <CartExample {...this.state} />
    )
  }
}
