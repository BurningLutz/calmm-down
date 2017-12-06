import * as React from 'karet'
import * as U from 'karet.util'
import * as L from 'partial.lenses'
import * as R from 'ramda'

import Square from './Square.js'

import s from './Board.scss'

export default function Board({game}) {
  const squares = game.view('squares')
  const isXNext = game.view('isXNext')
  const onClick = value => () => U.holding(() => {
    value.view(L.choose(v => {
      console.log(111, v)
      return ''
    })).get(10)
    value.set(isXNext.get() ? 'X' : 'O')
    isXNext.modify(R.not)
  })

  return (
    <div className={s.board}>
      {U.mapElems(
        (value, i) => <Square key={i} value={value} onClick={onClick(value)} />,
        squares
      )}
    </div>
  )
}
