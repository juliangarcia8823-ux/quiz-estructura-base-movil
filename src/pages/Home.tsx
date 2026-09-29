import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Quiz - Estructura Base Movil</h1>
      <p>Selecciona una opcion para registrar:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
        <button onClick={() => navigate('/users')}>Registrar Usuario</button>
        <button onClick={() => navigate('/persons')}>Registrar Persona</button>
        <button onClick={() => navigate('/products')}>Registrar Producto</button>
      </div>
    </div>
  );
};

export default Home;
