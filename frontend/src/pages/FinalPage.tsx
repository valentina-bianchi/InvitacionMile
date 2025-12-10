import styles from './FinalPage.module.css';

const FinalPage = () => {
  return (
    <div className={styles.container} id="final-page">
      <div className={styles.content}>
        {/* Decoración superior con muchas estrellas */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Mensaje principal */}
        <div className={styles.messageContainer}>
          <p className={styles.messageLine1}>Te espero...</p>
          <div className={styles.nameContainer}>
            <h1 className={styles.name}>Mile</h1>
          </div>
        </div>

        {/* Decoración con corazones y estrellas */}
        <div className={styles.decorations}>
          <span className={styles.heart}>💕</span>
          <span className={styles.star}>✨</span>
          <span className={styles.heart}>💕</span>
          <span className={styles.star}>✨</span>
          <span className={styles.heart}>💕</span>
        </div>

        {/* Decoración inferior con muchas estrellas */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;

