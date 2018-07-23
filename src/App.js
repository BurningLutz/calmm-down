import * as React from 'karet'
import * as U from 'karet.util'
import * as R from 'ramda'
import * as L from 'partial.lenses'

import InputPlayer from './components/InputPlayer.js'
import Versus from './components/Versus.js'

export default function App() {
  const state = U.atom({
    player1: { name: '' },
    player2: { name: '' },
  })

  const player1Name = state.view(['player1', 'name'])
  const player2Name = state.view(['player2', 'name'])

  const shouldShowVersus = state.view(L.reread(x => {
    return !R.isEmpty(x.player1.name) && !R.isEmpty(x.player2.name)
  }))

  return (
    <div className="flex-col main">
      <InputPlayer placeholder="player 1" name={player1Name} />
      <InputPlayer placeholder="player 2" name={player2Name} />
      { U.ift(shouldShowVersus,
        <Versus className="versus" p1={player1Name} p2={player2Name} />
      )}
    </div>
  )
}
