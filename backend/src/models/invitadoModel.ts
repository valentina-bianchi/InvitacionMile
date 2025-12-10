import mongoose, { Schema, Document, Model } from 'mongoose';

// Interfaz que describe el documento Invitado
export interface IInvitado extends Document {
  nombre: string;
  apellido: string;
  confirmado: boolean;
  fechaConfirmacion?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Esquema
const invitadoSchema: Schema<IInvitado> = new Schema(
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
    confirmado: {
      type: Boolean,
      default: true,
    },
    fechaConfirmacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // crea createdAt y updatedAt automáticamente
  }
);

// Modelo
const Invitado: Model<IInvitado> = mongoose.model<IInvitado>('Invitado', invitadoSchema);

export default Invitado;

