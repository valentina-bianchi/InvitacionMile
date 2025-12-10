import { useState, useEffect } from 'react';
import styles from './QuizPage.module.css';
import QuizGame from '../components/QuizGame';
import QuizRanking from '../components/QuizRanking';

interface Score {
  nombre: string;
  apellido: string;
  puntaje: number;
  correctAnswers: number;
  timeTaken: number;
}

const QuizPage = () => {
  const [showGame, setShowGame] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [playerLastName, setPlayerLastName] = useState('');
  const [showNameForm, setShowNameForm] = useState(false);
  const [topScores, setTopScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    loadTopScores();
  }, []);

  const loadTopScores = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/scores/ranking?limit=4`);
      const data = await response.json();
      if (data.success) {
        setTopScores(data.data);
      }
    } catch (error) {
      console.error('Error cargando ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayClick = () => {
    setShowNameForm(true);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && playerLastName.trim()) {
      setShowGame(true);
    }
  };

  const handleGameComplete = () => {
    setShowGame(false);
    setShowNameForm(false);
    setPlayerName('');
    setPlayerLastName('');
    loadTopScores();
  };

  if (showGame) {
    return (
      <QuizGame
        nombre={playerName}
        apellido={playerLastName}
        onComplete={handleGameComplete}
      />
    );
  }

  return (
    <div className={styles.container} id="quiz-page">
      <div className={styles.content}>
        {/* Decoración superior */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Título */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>¿Cuánto conoces a Mile?</h1>
        </div>

        {/* Ranking tipo montaña */}
        {!showNameForm && (
          <>
            <div className={styles.rankingContainer}>
              <h2 className={styles.rankingTitle}>Top 4 Mejores Puntajes</h2>
              {loading ? (
                <div className={styles.loading}>Cargando...</div>
              ) : topScores.length > 0 ? (
                <QuizRanking scores={topScores} />
              ) : (
                <div className={styles.noScores}>
                  Aún no hay puntajes. ¡Sé el primero en jugar!
                </div>
              )}
            </div>

            {/* Botón para jugar */}
            <div className={styles.buttonContainer}>
              <button className={styles.playButton} onClick={handlePlayClick}>
                🎯 Prueba tu amistad
              </button>
            </div>
          </>
        )}

        {/* Formulario de nombre */}
        {showNameForm && (
          <div className={styles.nameFormContainer}>
            <h2 className={styles.formTitle}>Ingresa tu nombre</h2>
            <form onSubmit={handleNameSubmit} className={styles.nameForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="nombre" className={styles.label}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className={styles.input}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="apellido" className={styles.label}>
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  value={playerLastName}
                  onChange={(e) => setPlayerLastName(e.target.value)}
                  className={styles.input}
                  required
                  placeholder="Tu apellido"
                />
              </div>

              <div className={styles.formButtons}>
                <button
                  type="button"
                  onClick={() => {
                    setShowNameForm(false);
                    setPlayerName('');
                    setPlayerLastName('');
                  }}
                  className={styles.cancelButton}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.startButton}>
                  Comenzar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

