import * as React from 'karet'
import * as R from 'ramda'

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
      {counters.view(R.addIndex(R.map)((_, i) => <Counter key={i} count={counters.view(i)} />))}
      <div>
        <Add counters={counters} />
      </div>
      <div>{counters.view(R.sum)}</div>
    </div>
  )
}
