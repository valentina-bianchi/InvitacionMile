import mongoose, { Schema, Document, Model } from 'mongoose';

// Interfaz que describe el documento Score
export interface IScore extends Document {
  nombre: string;
  apellido: string;
  puntaje: number;
  correctAnswers: number;
  timeTaken: number; // tiempo en segundos
  createdAt?: Date;
  updatedAt?: Date;
}

// Esquema
const scoreSchema: Schema<IScore> = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'Nombre es requerido'],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, 'Apellido es requerido'],
      trim: true,
    },
    puntaje: {
      type: Number,
      required: [true, 'Puntaje es requerido'],
      min: 0,
    },
    correctAnswers: {
      type: Number,
      required: [true, 'Cantidad de respuestas correctas es requerida'],
      min: 0,
      max: 10,
    },
    timeTaken: {
      type: Number,
      required: [true, 'Tiempo tomado es requerido'],
      min: 0,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

// Índice para ordenar por puntaje descendente
scoreSchema.index({ puntaje: -1 });

// Modelo
const Score: Model<IScore> = mongoose.model<IScore>('Score', scoreSchema);

export default Score;

