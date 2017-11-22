import * as React from 'karet'
import * as R from 'ramda'
import * as U from 'karet.util'
import * as L from 'partial.lenses'

export function Counter({count}) {
  return (
    <span>
      <button onClick={() => count.modify(R.add(-1))}>-</button>
      {count}
      <button onClick={() => count.modify(R.add(+1))}>+</button>
    </span>
  )
}

export function Items({items, Item}) {
  return (
    <ul>
      { U.seq(items, U.indices, U.mapCached(i => (
        <Item key={i} item={U.view(i, items)} />
      ))) }
    </ul>
  )
}

export function Remove({removable}) {
  return (
    <button onClick={() => removable.remove()}>x</button>
  )
}

const cartName = U.view('name')

const cartCount = U.view([
  'count',
  L.defaults(0),
  L.normalize(R.max(0)),
])

export function CartItem({item}) {
  return (
    <li style={{width: 400, height: 30}}>
      {cartName(item)}
      <div style={{float: 'right'}}>
        <Remove removable={item}/>
        <Counter count={cartCount(item)}/>
      </div>
    </li>
  )
}

export default function CartExample({products}) {
  return (
    <Items items={products} Item={CartItem} />
  )
}
