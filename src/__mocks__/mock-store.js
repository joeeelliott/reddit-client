import { configureStore, Store } from '@reduxjs/toolkit'
import { ConnectedRouter } from 'connected-react-router'
import React, { ComponentType, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { history, middleware, reducer } from '../app/store'

export const makeStore = (): Store => {
  return configureStore({ reducer, middleware })
}

const wrapComponent = (Component: ComponentType, store: Store | null = null, props = {}): ReactElement => {
  return (
    <Provider store={store || makeStore()}>
      <ConnectedRouter history={history}>
        <Component {...props} />
      </ConnectedRouter>
    </Provider>
  )
}

export default wrapComponent