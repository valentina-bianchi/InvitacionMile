import styles from './QuizRanking.module.css';

interface Score {
  nombre: string;
  apellido: string;
  puntaje: number;
  correctAnswers: number;
  timeTaken: number;
}

interface QuizRankingProps {
  scores: Score[];
}

const QuizRanking = ({ scores }: QuizRankingProps) => {
  // Ordenar por puntaje descendente y tomar los 4 mejores
  const top4 = [...scores].sort((a, b) => b.puntaje - a.puntaje).slice(0, 4);

  // Alturas relativas para el efecto montaña
  const heights = [100, 75, 60, 45]; // Porcentajes de altura

  return (
    <div className={styles.mountainRanking}>
      {top4.map((score, index) => {
        const height = heights[index] || 45;
        const position = index + 1;
        const isTop = position === 1;

        return (
          <div
            key={index}
            className={styles.mountainPeak}
            style={{ height: `${height}%` }}
          >
            <div className={styles.peakContent}>
              {isTop && <div className={styles.crown}>👑</div>}
              <div className={styles.position}>{position}°</div>
              <div className={styles.name}>
                {score.nombre} {score.apellido}
              </div>
              <div className={styles.score}>{score.puntaje} pts</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizRanking;

