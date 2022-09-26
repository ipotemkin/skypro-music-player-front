import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter} from 'react-router-dom';
import App from './App';

import { CookiesProvider } from 'react-cookie';

import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
);
