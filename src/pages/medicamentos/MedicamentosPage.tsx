import { useState, useEffect } from 'react';
import { Layout } from '@components/layout';
import { apiCall } from '@services/api';
import type { Medicamento } from '../../types/medicamento';
import './MedicamentosPage.css';

const MedicamentosPage = () => {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <Layout title="Medicamentos" currentPath="/medicamentos">
      {error && <div className="error-message">{error}</div>}

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
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med) => (
                <tr key={med.id}>
                  <td>{med.id}</td>
                  <td>{med.nombre}</td>
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
