import styles from './PhotosPage.module.css';

const PhotosPage = () => {
  const driveUrl = 'https://drive.google.com/drive/folders/17qfA43X4flG0T9U0OXj9ZSNAlgyMBe0m?usp=sharing';

  return (
    <div className={styles.container} id="photos-page">
      <div className={styles.content}>
        {/* Decoración superior */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Título */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Compartí tus fotos del cumpleaños de Mile</h1>
        </div>

        {/* Botón Google Drive */}
        <div className={styles.buttonContainer}>
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.driveButton}
          >
            <svg
              className={styles.driveIcon}
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.71 4.29L3.29 8.71C2.9 9.1 2.9 9.73 3.29 10.12L10.12 16.95C10.51 17.34 11.14 17.34 11.53 16.95L20.71 7.77C21.1 7.38 21.1 6.75 20.71 6.36L16.29 1.94C15.9 1.55 15.27 1.55 14.88 1.94L7.71 4.29Z" />
            </svg>
            <span className={styles.driveText}>SUBIR FOTOS</span>
          </a>
        </div>

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('final-page');
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

export default PhotosPage;

