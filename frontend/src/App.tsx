import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import SecondPage from './pages/SecondPage';
import CountdownPage from './pages/CountdownPage';
import LocationPage from './pages/LocationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ItinerarioPage from './pages/ItinerarioPage';
import SpotifyPage from './pages/SpotifyPage';
import QuizPage from './pages/QuizPage';
import FinalPage from './pages/FinalPage';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <HomePage />
        <div id="second-page">
          <SecondPage />
        </div>
        <CountdownPage />
        <LocationPage />
        <ConfirmationPage />
        <ItinerarioPage />
        <SpotifyPage />
        <QuizPage />
        <FinalPage />
      </main>
    </div>
  );
}

export default App;
