import * as React from 'karet'
import * as U from 'karet.util'
import * as L from 'partial.lenses'
import * as R from 'ramda'

import Square from './Square.js'

import s from './Board.scss'

export default function Board({game}) {
  const squares = game.view('squares')
  const onClick = i => () => game.modify(x => {
    if (x.squares[i] === undefined) {
      return U.seq(
        x,
        L.set(['squares', i], x.isXNext ? 'X': 'O'),
        L.modify('isXNext', R.not)
      )
    } else {
      return x
    }
  })

  return (
    <div className={s.board}>
      {U.seq(
        squares,
        U.indices,
        U.mapCached(i =>
          <Square key={i} value={squares.view(i)} onClick={onClick(i)} />
        )
      )}
    </div>
  )
}
