import { useState, useEffect, useCallback } from 'react';
import Layout from '@components/Layout';
import { apiCall } from '@services/api';
import type { SolicitudMedicamento } from 'solicitud';
import type { Medicamento } from 'medicamento';
import './SolicitudesPage.css';

const SolicitudesPage = () => {
  const [solicitudes, setSolicitudes] = useState<SolicitudMedicamento[]>([]);
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    medicamentoId: '',
    numeroOrden: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
  });

  const currentUserId = localStorage.getItem('userId');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // Obtener solicitudes del usuario
      const solicitudesResponse = await apiCall.get(
        `/solicitudes-medicamentos/usuario/${currentUserId}`
      );
      setSolicitudes(solicitudesResponse.data);

      // Obtener medicamentos
      const medicamentosResponse = await apiCall.get('/medicamentos');
      setMedicamentos(medicamentosResponse.data);

      setError('');
    } catch (err: unknown) {
      setError('Error al cargar datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiCall.post('/solicitudes-medicamentos', {
        medicamentoId: parseInt(formData.medicamentoId),
        usuarioId: parseInt(currentUserId || '0'),
        numeroOrden: formData.numeroOrden,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correoElectronico: formData.correoElectronico,
      });
      setFormData({
        medicamentoId: '',
        numeroOrden: '',
        direccion: '',
        telefono: '',
        correoElectronico: '',
      });
      setShowForm(false);
      setSuccessMessage('Solicitud creada exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchData();
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Error al crear solicitud');
      console.error(err);
    }
  };

  const getMedicamentoNombre = (medicamentoId: number) => {
    const med = medicamentos.find((m) => m.id === medicamentoId);
    return med ? med.nombre : `ID: ${medicamentoId}`;
  };

  return (
    <Layout title="Mis Solicitudes" currentPath="/solicitudes">
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : '+ Nueva Solicitud'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>Nueva Solicitud de Medicamento</h3>

          <div className="form-group">
            <label htmlFor="medicamentoId">Medicamento *</label>
            <select
              id="medicamentoId"
              name="medicamentoId"
              value={formData.medicamentoId}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona un medicamento</option>
              {medicamentos.map((med) => (
                <option key={med.id} value={med.id}>
                  {med.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numeroOrden">Número de Orden *</label>
            <input
              type="text"
              id="numeroOrden"
              name="numeroOrden"
              value={formData.numeroOrden}
              onChange={handleInputChange}
              placeholder="ej: ORD-2026-001"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección de Entrega *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="ej: Calle 123, Apartamento 4B"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              placeholder="ej: +57 300 1234567"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correoElectronico">Correo Electrónico *</label>
            <input
              type="email"
              id="correoElectronico"
              name="correoElectronico"
              value={formData.correoElectronico}
              onChange={handleInputChange}
              placeholder="ej: usuario@email.com"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Crear Solicitud
          </button>
        </form>
      )}

      {loading ? (
        <p className="loading-message">Cargando solicitudes...</p>
      ) : solicitudes.length === 0 ? (
        <p className="empty-state">No hay solicitudes disponibles</p>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Medicamento</th>
                <th>Número de Orden</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((sol) => (
                <tr key={sol.id}>
                  <td>{sol.id}</td>
                  <td>{getMedicamentoNombre(sol.medicamentoId)}</td>
                  <td>{sol.numeroOrden}</td>
                  <td>{sol.direccion}</td>
                  <td>{sol.telefono}</td>
                  <td>{sol.correoElectronico}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default SolicitudesPage;
