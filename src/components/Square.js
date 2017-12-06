import * as React from 'karet'

import s from './Square.scss'

export default function Square({value, onClick}) {
  return (
    <button className={s.square} onClick={onClick}>{value}</button>
  )
}
