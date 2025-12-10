import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container} id="home">
      <div className={styles.content}>
        {/* Estrellas decorativas superiores */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Título principal "Mis 15" */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Mis 15</h1>
        </div>

        {/* Fecha y hora */}
        <div className={styles.dateContainer}>
          <div className={styles.dayMonth}>DOMINGO</div>
          
          <div className={styles.dateCenter}>
            <div className={styles.dateNumberContainer}>
              <div className={styles.dateLine}></div>
              <div className={styles.dateNumber}>18</div>
              <div className={styles.dateLine}></div>
            </div>
            <div className={styles.monthBelow}>ENERO</div>
          </div>
          
          <div className={styles.time}>12:00 HS</div>
        </div>

        {/* Nombre "Mile" */}
        <div className={styles.nameContainer}>
          <h2 className={styles.name}>Mile</h2>
        </div>

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('second-page');
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

export default HomePage;

