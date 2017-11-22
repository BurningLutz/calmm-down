import * as React from 'karet'
import * as R from 'ramda'

export default function Counter({count}) {
  return (
    <span>
      <button onClick={() => count.modify(R.add(-1))}>-</button>
      {count}
      <button onClick={() => count.modify(R.add(+1))}>+</button>
    </span>
  )
}
