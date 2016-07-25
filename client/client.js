import React            from 'react'
import { render }       from 'react-dom'
import App              from '../components/App'
import configureStore   from '../redux/store'
import { Provider }     from 'react-redux'
import Immutable        from 'Immutable'

let initialState = {
  content: {
    category: "people",
    listheight: 500,
    list: {},
    detail: {
      show: false,
    }
  }
}

let store = configureStore(initialState)

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
)
