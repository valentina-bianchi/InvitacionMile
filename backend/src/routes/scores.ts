import { Router, Request, Response } from 'express';
import Score from '../models/scoreModel';

const router = Router();

// POST /api/scores - Guardar una nueva puntuación
router.post('/scores', async (req: Request, res: Response): Promise<any> => {
  try {
    const { nombre, apellido, puntaje, correctAnswers, timeTaken } = req.body;

    // Validación básica
    if (!nombre || !apellido) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y apellido son requeridos',
      });
    }

    if (puntaje === undefined || correctAnswers === undefined || timeTaken === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Puntaje, correctAnswers y timeTaken son requeridos',
      });
    }

    if (typeof puntaje !== 'number' || typeof correctAnswers !== 'number' || typeof timeTaken !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Puntaje, correctAnswers y timeTaken deben ser números',
      });
    }

    if (correctAnswers < 0 || correctAnswers > 10) {
      return res.status(400).json({
        success: false,
        message: 'correctAnswers debe estar entre 0 y 10',
      });
    }

    if (timeTaken < 0) {
      return res.status(400).json({
        success: false,
        message: 'timeTaken debe ser un número positivo',
      });
    }

    // Crear el nuevo score
    const newScore = new Score({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      puntaje,
      correctAnswers,
      timeTaken,
    });

    const savedScore = await newScore.save();

    res.status(201).json({
      success: true,
      message: 'Puntuación guardada exitosamente',
      data: savedScore,
    });
  } catch (err: any) {
    console.error('Error guardando puntuación:', err);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: err.message,
    });
  }
});

// GET /api/scores/ranking - Obtener el ranking de puntuaciones
router.get('/scores/ranking', async (req: Request, res: Response): Promise<any> => {
  try {
    const { limit = '10' } = req.query;
    const limitNum = parseInt(limit as string, 10);

    // Obtener los mejores puntajes ordenados por puntaje descendente
    const scores = await Score.find()
      .sort({ puntaje: -1, timeTaken: 1, createdAt: -1 }) // Ordenar por puntaje (mayor a menor), luego por tiempo (menor a mayor), luego por fecha
      .limit(limitNum)
      .select('nombre apellido puntaje correctAnswers timeTaken createdAt')
      .lean();

    // Agregar posición en el ranking
    const ranking = scores.map((score, index) => ({
      posicion: index + 1,
      nombre: score.nombre,
      apellido: score.apellido,
      puntaje: score.puntaje,
      correctAnswers: score.correctAnswers,
      timeTaken: score.timeTaken,
      createdAt: score.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: ranking,
      total: ranking.length,
    });
  } catch (err: any) {
    console.error('Error obteniendo ranking:', err);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: err.message,
    });
  }
});

// GET /api/scores - Obtener todas las puntuaciones (opcional, para debugging)
router.get('/scores', async (req: Request, res: Response): Promise<any> => {
  try {
    const scores = await Score.find()
      .sort({ puntaje: -1, timeTaken: 1, createdAt: -1 })
      .select('nombre apellido puntaje correctAnswers timeTaken createdAt')
      .lean();

    res.status(200).json({
      success: true,
      data: scores,
      total: scores.length,
    });
  } catch (err: any) {
    console.error('Error obteniendo puntuaciones:', err);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: err.message,
    });
  }
});

export default router;

