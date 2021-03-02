
import './App.css';

import Routes from './routes/Routes'
import Navigation from './layout/Navigation/Navigation'



function App() {
  return (
    <>
      <Navigation />

      <main>
        <Routes />
      </main>
    </>
  );
}

export default App;
