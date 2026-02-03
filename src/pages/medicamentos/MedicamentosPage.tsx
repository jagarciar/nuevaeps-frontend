import { useState, useEffect } from 'react';
import { Layout } from '@components/layout';
import { apiCall } from '@services/api';
import { isAdmin as checkIsAdmin } from '@utils/authUtils';
import type { Medicamento } from '../../types/medicamento';
import EditarMedicamento from './EditarMedicamento';
import './MedicamentosPage.css';

const MedicamentosPage = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingMedicamento, setEditingMedicamento] = useState<Medicamento | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
  });

  useEffect(() => {
    fetchMedicamentos();
    checkAdminRole();
  }, []);

  const checkAdminRole = () => {
    setIsAdmin(checkIsAdmin());
  };

  const fetchMedicamentos = async () => {
    try {
      setLoading(true);
      const response = await apiCall.get('/medicamentos');
      setMedicamentos(response.data);
      setError('');
    } catch (err: unknown) {
      setError('Error al cargar medicamentos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      await apiCall.post('/medicamentos', {
        nombre: formData.nombre,
      });
      setFormData({ nombre: '' });
      setShowForm(false);
      setSuccessMessage('Medicamento creado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchMedicamentos();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Error al crear medicamento');
      console.error(err);
    }
  };

  const handleEditClick = (medicamento: Medicamento) => {
    setEditingMedicamento(medicamento);
  };

  const handleEditClose = () => {
    setEditingMedicamento(null);
  };

  const handleEditSuccess = () => {
    setSuccessMessage('Medicamento actualizado exitosamente');
    setTimeout(() => setSuccessMessage(''), 3000);
    fetchMedicamentos();
  };

  return (
    <Layout title="Medicamentos" currentPath="/medicamentos">
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {isAdmin && (
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Nuevo Medicamento'}
        </button>
      )}

      {showForm && isAdmin && (
        <div className="form-container">
          <h3>Crear Nuevo Medicamento</h3>
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
            <button type="submit" className="submit-btn">
              Crear Medicamento
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Cargando medicamentos...</p>
      ) : medicamentos.length === 0 ? (
        <p className="empty-state">No hay medicamentos disponibles</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                {isAdmin && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med) => (
                <tr key={med.id}>
                  <td>{med.id}</td>
                  <td>{med.nombre}</td>
                  {isAdmin && (
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(med)}
                        title="Editar medicamento"
                      >
                        Editar
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingMedicamento && (
        <EditarMedicamento
          medicamento={editingMedicamento}
          onClose={handleEditClose}
          onSuccess={handleEditSuccess}
        />
      )}
    </Layout>
  );
};

export default MedicamentosPage;
