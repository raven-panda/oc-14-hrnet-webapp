import type { ReactNode } from 'react';
import './assets/css/index.css';
import { ModalProvider } from './components/modal/ModalProvider';
import { AppRouter } from './router/Router';

function App({ router = <AppRouter /> }: { router?: ReactNode }) {
  return (
    <ModalProvider>
      {router}
    </ModalProvider>
  )
}

export default App;
