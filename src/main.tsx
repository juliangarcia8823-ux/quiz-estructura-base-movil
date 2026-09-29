import React from 'react';
import { createRoot } from 'react-dom/client';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import App from './App';

jeepSqlite(window);

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
