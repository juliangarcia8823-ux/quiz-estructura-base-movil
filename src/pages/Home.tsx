import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Quiz - Estructura Base Móvil</h1>
      <p>Selecciona una opción para registrar:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
        <button onClick={() => navigate('/usuarios')}>Registrar Usuario</button>
        <button onClick={() => navigate('/personas')}>Registrar Persona</button>
        <button onClick={() => navigate('/productos')}>Registrar Producto</button>
      </div>
    </div>
  );
};

export default Home;
