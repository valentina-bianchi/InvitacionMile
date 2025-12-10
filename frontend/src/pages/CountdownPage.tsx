import { useState, useEffect } from 'react';
import styles from './CountdownPage.module.css';

const CountdownPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Fecha objetivo: 18 de enero 2026 a las 12:00
    const targetDate = new Date('2026-01-18T12:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Actualizar inmediatamente
    updateCountdown();

    // Actualizar cada segundo
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className={styles.container} id="countdown-page">
      <div className={styles.content}>
        {/* Título "FALTAN" */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Faltan</h1>
        </div>

        {/* Countdown */}
        <div className={styles.countdownContainer}>
          <div className={styles.timeUnit}>
            <div className={styles.number}>{formatNumber(timeLeft.days)}</div>
            <div className={styles.label}>DÍAS</div>
          </div>
          
          <div className={styles.separator}>:</div>
          
          <div className={styles.timeUnit}>
            <div className={styles.number}>{formatNumber(timeLeft.hours)}</div>
            <div className={styles.label}>HORAS</div>
          </div>
          
          <div className={styles.separator}>:</div>
          
          <div className={styles.timeUnit}>
            <div className={styles.number}>{formatNumber(timeLeft.minutes)}</div>
            <div className={styles.label}>MINUTOS</div>
          </div>
          
          <div className={styles.separator}>:</div>
          
          <div className={styles.timeUnit}>
            <div className={styles.number}>{formatNumber(timeLeft.seconds)}</div>
            <div className={styles.label}>SEGUNDOS</div>
          </div>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('location-page');
          nextPage?.scrollIntoView({ behavior: 'smooth' });
        }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;

