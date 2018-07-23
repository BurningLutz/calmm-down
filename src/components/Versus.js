import * as React from 'karet'

import S from './Versus.scss'

export default function Welcome({p1, p2, className, ...rest}) {
  return (
    <section className={`${className} flex align-center`} {...rest}>
      <h2 className={S.p}><strong>{p1}</strong></h2>
      <p className={S.versus}>VS</p>
      <h2 className={`${S.p} ta-right`}><strong>{p2}</strong></h2>
    </section>
  )
}
