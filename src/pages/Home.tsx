import React from 'react';
import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
const navigate = useNavigate();
return (
<div style={{ padding: '20px', textAlign: 'center' }}>
Quiz - Estructura Base Móvil
Selecciona una opción para registrar:
<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '0 auto' }}>
<button onClick={() => navigate('/users')}>Registrar Usuario
<button onClick={() => navigate('/persons')}>Registrar Persona
<button onClick={() => navigate('/products')}>Registrar Producto


);
};
export default Home;
