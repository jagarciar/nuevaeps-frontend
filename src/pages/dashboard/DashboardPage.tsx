import { useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@components/layout';
import './DashboardPage.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const cards = [
    {
      title: 'Medicamentos',
      description: 'Gestiona el catálogo de medicamentos',
      icon: '💊',
      path: '/medicamentos',
      color: '#667eea',
    },
    {
      title: 'Solicitudes',
      description: 'Crea y gestiona solicitudes de medicamentos',
      icon: '📋',
      path: '/solicitudes',
      color: '#764ba2',
    },
    {
      title: 'API Docs',
      description: 'Consulta la documentación de la API',
      icon: '📚',
      path: 'http://localhost:8080/swagger-ui.html',
      external: true,
      color: '#f093fb',
    },
  ];

  return (
    <Layout title="Panel Principal" currentPath={location.pathname}>
      <div className="dashboard-grid">
        {cards.map((card) => (
          <div
            key={card.path}
            className="dashboard-card"
            style={{ borderLeftColor: card.color }}
            onClick={() => {
              if (card.external) {
                window.open(card.path, '_blank');
              } else {
                navigate(card.path);
              }
            }}
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;
