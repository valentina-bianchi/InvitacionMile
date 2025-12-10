import styles from './SecondPage.module.css';

const SecondPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Decoración superior */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Mensaje principal */}
        <div className={styles.messageContainer}>
          <p className={styles.message}>
            Te espero para que compartas conmigo este día tan especial
          </p>
        </div>

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('countdown-page');
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

export default SecondPage;

