import { useState } from 'react';
import styles from './QuizGame.module.css';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizGameProps {
  nombre: string;
  apellido: string;
  onComplete: () => void;
}

// Preguntas sobre Mile (puedes personalizarlas)
const questions: Question[] = [
  {
    question: '¿Cuál/es es el color favorito de Mile?',
    options: ['Negro y violeta', 'Rosa y azul', 'Verde', 'Gris'],
    correct: 0,
  },
  {
    question: '¿Cual/es la/las serie/s fav/s de mile principalmente?',
    options: ['Re zero', 'Tgcf (heaven official blessing), ons (owari no seraph) y mdzs (mo dao zu shi)', 'Friends y La Casa de Papel', 'Black bluter'],
    correct: 1,
  },
  {
    question: '¿Cuál es la comida favorita de Mile?',
    options: ['Pizza', 'Hamburguesa', 'Pasta',  'Sushi'],
    correct: 3,
  },
  {
    question: '¿Qué deporte practica Mile?',
    options: ['Tenis', 'Natación', 'Basketball', 'Voleibol'],
    correct: 2,
  },
  {
    question: '¿Cuál es la bebida favorita de Mile?',
    options: ['Agua', 'Speed', 'Fanta', 'Sprite'],
    correct: 1,
  },
  {
    question: 'La mascota de Mile es un...',
    options: ['Gato','Perro', 'Conejo', 'Pájaro'],
    correct: 0,
  },
  {
    question: '¿Qué música le gusta más a Mile?',
    options: ['Pop', 'Rock',  'Reggaeton', 'K-pop y J-pop'],
    correct: 3,
  },
  {
    question: '¿Qué estación del año prefiere Mile?',
    options: ['Verano', 'Invierno', 'Primavera', 'Otoño'],
    correct: 1,
  },
  {
    question: '¿Que idioma habla mejor Mile aparte del español?',
    options: ['Ingles', 'Japones', 'Frances', 'Alemán'],
    correct: 0,
  },
  {
    question: '¿Cual/es son los juegos favoritos de Mile?',
    options: ['Minecraft y Minesweeper', 'Cookie run kingdom ', 'Roblox, Minesweeper Dbd', 'Dead by daylight '],
    correct: 2,
  },
];

const QuizGame = ({ nombre, apellido, onComplete }: QuizGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime] = useState(Date.now());
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [ranking, setRanking] = useState<any[]>([]);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Ya se seleccionó una respuesta

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
    }

    // Avanzar a la siguiente pregunta después de 1 segundo
    setTimeout(() => {
      const newCorrectCount = isCorrect ? correctAnswers + 1 : correctAnswers;
      
      if (currentQuestion < questions.length - 1) {
        setCorrectAnswers(newCorrectCount);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // Terminó el juego
        const endTime = Date.now();
        const time = Math.floor((endTime - startTime) / 1000);
        setTimeTaken(time);

        // Calcular puntaje: (respuestas correctas * 100) - (tiempo en segundos / 10)
        const finalCorrect = newCorrectCount;
        const score = Math.max(0, finalCorrect * 100 - Math.floor(time / 10));
        setFinalScore(score);
        setCorrectAnswers(finalCorrect);

        // Guardar en el backend
        saveScore(score, finalCorrect, time);
      }
    }, 1000);
  };

  const saveScore = async (score: number, correct: number, time: number) => {
    try {
      const response = await fetch(`${apiUrl}/api/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          puntaje: score,
          correctAnswers: correct,
          timeTaken: time,
        }),
      });

      const data = await response.json();
      if (data.success) {
        // Cargar ranking actualizado
        loadRanking();
        setShowResult(true);
      }
    } catch (error) {
      console.error('Error guardando puntaje:', error);
      loadRanking();
      setShowResult(true);
    }
  };

  const loadRanking = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/scores/ranking?limit=10`);
      const data = await response.json();
      if (data.success) {
        setRanking(data.data);
      }
    } catch (error) {
      console.error('Error cargando ranking:', error);
    }
  };

  if (showResult) {
    return (
      <div className={styles.resultContainer}>
        <div className={styles.resultContent}>
          <div className={styles.resultHeader}>
            <h2 className={styles.resultTitle}>¡Juego Completado!</h2>
            <div className={styles.scoreDisplay}>
              <div className={styles.scoreLabel}>Tu Puntaje</div>
              <div className={styles.scoreValue}>{finalScore} pts</div>
              <div className={styles.scoreDetails}>
                {correctAnswers} respuestas correctas en {timeTaken} segundos
              </div>
            </div>
          </div>

          <div className={styles.rankingSection}>
            <h3 className={styles.rankingTitle}>Ranking General</h3>
            <div className={styles.rankingList}>
              {ranking.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.rankingItem} ${
                    item.nombre === nombre && item.apellido === apellido
                      ? styles.yourScore
                      : ''
                  }`}
                >
                  <span className={styles.rankPosition}>{item.posicion}°</span>
                  <span className={styles.rankName}>
                    {item.nombre} {item.apellido}
                  </span>
                  <span className={styles.rankScore}>{item.puntaje} pts</span>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.playAgainButton} onClick={onComplete}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameContent}>
        {/* Barra de progreso */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          Pregunta {currentQuestion + 1} de {questions.length}
        </div>

        {/* Pregunta */}
        <div className={styles.questionContainer}>
          <h2 className={styles.question}>{question.question}</h2>
        </div>

        {/* Opciones */}
        <div className={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showResult = selectedAnswer !== null;

            let optionClass = styles.option;
            if (showResult) {
              if (isCorrect) {
                optionClass += ` ${styles.correct}`;
              } else if (isSelected && !isCorrect) {
                optionClass += ` ${styles.incorrect}`;
              }
            } else if (isSelected) {
              optionClass += ` ${styles.selected}`;
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
                {showResult && isCorrect && <span className={styles.checkmark}>✓</span>}
                {showResult && isSelected && !isCorrect && (
                  <span className={styles.cross}>✗</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizGame;

