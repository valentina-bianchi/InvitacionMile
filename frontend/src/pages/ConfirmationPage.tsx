import { useState } from 'react';
import styles from './ConfirmationPage.module.css';
import ConfirmationModal from '../components/ConfirmationModal';

const ConfirmationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container} id="confirmation-page">
      <div className={styles.content}>
        {/* Decoración superior */}
        <div className={styles.starsTop}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Título */}
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Confirmar asistencia</h1>
        </div>

        {/* Mensaje */}
        <div className={styles.messageContainer}>
          <p className={styles.message}>
            Tu presencia es muy importante para mí en este día tan especial, por favor confirma asistencia con nombre y apellido
          </p>
        </div>

        {/* Botón CONFIRMAR */}
        <div className={styles.buttonContainer}>
          <button className={styles.confirmButton} onClick={() => setIsModalOpen(true)}>
            CONFIRMAR
          </button>
        </div>

        {/* Decoración inferior */}
        <div className={styles.starsBottom}>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
          <span className={styles.star}>✨</span>
        </div>

        {/* Flecha para siguiente página */}
        <div className={styles.arrowDown} onClick={() => {
          const nextPage = document.getElementById('itinerario-page');
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

      {/* Modal */}
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ConfirmationPage;

