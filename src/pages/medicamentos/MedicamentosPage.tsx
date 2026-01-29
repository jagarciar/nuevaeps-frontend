import { useState, useEffect } from 'react';
import { Layout } from '@components/layout';
import { apiCall } from '@services/api';
import type { Medicamento } from '../../types/medicamento';
import './MedicamentosPage.css';

const MedicamentosPage = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });

  useEffect(() => {
    fetchMedicamentos();
  }, []);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiCall.post('/medicamentos', {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
      });
      setFormData({ nombre: '', descripcion: '', precio: '' });
      setShowForm(false);
      fetchMedicamentos();
    } catch (err: unknown) {
      setError('Error al crear medicamento');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este medicamento?')) {
      try {
        await apiCall.delete(`/medicamentos/${id}`);
        fetchMedicamentos();
      } catch (err: unknown) {
        setError('Error al eliminar medicamento');
        console.error(err);
      }
    }
  };

  return (
    <Layout title="Medicamentos" currentPath="/medicamentos">
      {error && <div className="error-message">{error}</div>}

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : '+ Nuevo Medicamento'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>Nuevo Medicamento</h3>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              name="precio"
              step="0.01"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Crear Medicamento
          </button>
        </form>
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
                <th>Descripción</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med) => (
                <tr key={med.id}>
                  <td>{med.id}</td>
                  <td>{med.nombre}</td>
                  <td>{med.descripcion}</td>
                  <td>${med.precio?.toFixed(2)}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(med.id!)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default MedicamentosPage;
