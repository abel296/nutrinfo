import './App.css';

import Routes from './routes/Routes'
import Navigation from './layout/Navigation/Navigation'
import Footer from './layout/Footer/Footer'



function App() {
  return (
    <>
      <Navigation />

      <main>
        <Routes />
      </main>

      <Footer />
    </>
  );
}

export default App;
