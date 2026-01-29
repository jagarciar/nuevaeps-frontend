import { Navigate, Outlet } from 'react-router-dom'

interface PrivateRouteProps {
  isAuthenticated: boolean
}

const PrivateRoute = ({ isAuthenticated }: PrivateRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute
