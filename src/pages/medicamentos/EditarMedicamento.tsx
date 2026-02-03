import { useState } from 'react';
import { apiCall } from '@services/api';
import type { Medicamento } from '../../types/medicamento';

interface EditarMedicamentoProps {
  medicamento: Medicamento;
  onClose: () => void;
  onSuccess: () => void;
}

const EditarMedicamento = ({ medicamento, onClose, onSuccess }: EditarMedicamentoProps) => {
  const [formData, setFormData] = useState({ nombre: medicamento.nombre });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      setError('El nombre del medicamento es requerido');
      return;
    }
    try {
      setLoading(true);
      await apiCall.put(`/medicamentos/${medicamento.id}`, {
        nombre: formData.nombre,
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Error al actualizar medicamento');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <h3>Editar Medicamento</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Medicamento:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Loratadina"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarMedicamento;
