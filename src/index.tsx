import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import { store } from './app/store'
import { Routes } from './routes'
import './index.css'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
)
