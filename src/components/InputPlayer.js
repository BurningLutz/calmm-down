import * as React from 'karet'
// import * as U from 'karet.util'

import S from './InputPlayer.scss'

export default function InputPlayer({name, ...rest}) {
  return (
    <input className={S.input}
      value={name}
      onChange={e => name.set(e.target.value)}
      {...rest}
    />
  )
  // or do like this:
  // return (
  //   <input className={S.input}
  //     {...U.bind({value: name})}
  //     {...rest}
  //   />
  // )
}
