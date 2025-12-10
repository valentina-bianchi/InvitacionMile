import { Router, Request, Response } from 'express';
import Invitado from '../models/invitadoModel';

const router = Router();

// POST /api/invitados - Confirmar asistencia
router.post('/invitados', async (req: Request, res: Response): Promise<any> => {
  try {
    const { nombre, apellido } = req.body;

    // Validación básica
    if (!nombre || !apellido) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y apellido son requeridos',
      });
    }

    if (typeof nombre !== 'string' || typeof apellido !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Nombre y apellido deben ser texto',
      });
    }

    // Crear el nuevo invitado
    const newInvitado = new Invitado({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      confirmado: true,
      fechaConfirmacion: new Date(),
    });

    const savedInvitado = await newInvitado.save();

    res.status(201).json({
      success: true,
      message: 'Asistencia confirmada exitosamente',
      data: savedInvitado,
    });
  } catch (err: any) {
    console.error('Error confirmando asistencia:', err);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: err.message,
    });
  }
});

// GET /api/invitados - Obtener todos los invitados confirmados
router.get('/invitados', async (req: Request, res: Response): Promise<any> => {
  try {
    const invitados = await Invitado.find({ confirmado: true })
      .sort({ fechaConfirmacion: -1 })
      .select('nombre apellido fechaConfirmacion createdAt')
      .lean();

    res.status(200).json({
      success: true,
      data: invitados,
      total: invitados.length,
    });
  } catch (err: any) {
    console.error('Error obteniendo invitados:', err);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: err.message,
    });
  }
});

export default router;

