import Loadable from 'react-loadable'

export default function loadable(fn) {
  return Loadable({
    loader: fn,
    loading: () => null
  })
}
