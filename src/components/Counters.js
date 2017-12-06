import * as React from 'karet'
import * as R from 'ramda'
import * as U from 'karet.util'

export function Counter({count}) {
  return (
    <span>
      <button onClick={() => count.modify(R.add(-1))}>-</button>
      <span>{count}</span>
      <button onClick={() => count.modify(R.add(+1))}>+</button>
    </span>
  )
}

export function Add({counters}) {
  return (
    <button onClick={() => counters.modify(R.append(0))}>add new</button>
  )
}


export default ({counters}) => {
  return (
    <div>
      {U.mapElems((count, i) => <Counter key={i} count={count} />, counters)}
      <div>
        <Add counters={counters} />
      </div>
      <div>{U.view(R.sum, counters)}</div>
    </div>
  )
}
