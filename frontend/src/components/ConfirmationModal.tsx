import { useState } from 'react';
import styles from './ConfirmationModal.module.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal = ({ isOpen, onClose }: ConfirmationModalProps) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/invitados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al confirmar asistencia');
      }

      setSuccess(true);
      setNombre('');
      setApellido('');

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al confirmar asistencia');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
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
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {success ? (
          <div className={styles.successContainer}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.successTitle}>¡Confirmación exitosa!</h2>
            <p className={styles.successMessage}>
              Tu asistencia ha sido confirmada. ¡Te esperamos!
            </p>
          </div>
        ) : (
          <>
            <h2 className={styles.modalTitle}>Confirmar Asistencia</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="nombre" className={styles.label}>
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className={styles.input}
                  required
                  disabled={loading}
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="apellido" className={styles.label}>
                  Apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className={styles.input}
                  required
                  disabled={loading}
                  placeholder="Ingresa tu apellido"
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading || !nombre.trim() || !apellido.trim()}
                >
                  {loading ? 'Confirmando...' : 'Confirmar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;

