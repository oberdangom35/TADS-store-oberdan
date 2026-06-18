import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function RotaPrivada({ children }) {
  const { logado } = useAuth();
  
  return logado ? children : <Navigate to="/login" />;
}

export default RotaPrivada;
