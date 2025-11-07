import './assets/css/index.css';
import { ModalProvider } from './components/modal/ModalProvider';
import AppRouter from './router/Router';

function App() {
  return (
    <ModalProvider>
      <AppRouter />
    </ModalProvider>
  )
}

export default App;
