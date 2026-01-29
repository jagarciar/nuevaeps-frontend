import { useNavigate, useLocation } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
  title: string
  currentPath: string
}

const Layout = ({ children, title }: LayoutProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>NuevaEPS</h1>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <a
                href="#"
                onClick={() => navigate('/')}
                className={isActive('/') ? 'active' : ''}
              >
                🏠 Panel Principal
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigate('/medicamentos')}
                className={isActive('/medicamentos') ? 'active' : ''}
              >
                💊 Medicamentos
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => navigate('/solicitudes')}
                className={isActive('/solicitudes') ? 'active' : ''}
              >
                📋 Solicitudes
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        <div className="header">
          <h2>{title}</h2>
          <div className="user-section">
            <span>
              Hola, <strong>{localStorage.getItem('username') || 'Usuario'}</strong>
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default Layout
