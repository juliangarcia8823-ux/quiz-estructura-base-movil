import { Navigate, Route } from 'react-router-dom';

import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from '@ionic/react';

import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';

import Home from './pages/Home';
import UsersPage from './presentation/users/UsersPage';
import ProductsPage from './presentation/products/ProductsPage';
import PersonsPage from './presentation/persons/PersonsPage';
import { databaseService } from './infrastructure/database/DatabaseService';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [databaseReady, setDatabaseReady] = useState(false);
  const [databaseError, setDatabaseError] = useState('');

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await databaseService.initialize();
        setDatabaseReady(true);
      } catch (error) {
        setDatabaseError(
          error instanceof Error
            ? error.message
            : 'No se pudo inicializar la base de datos.'
        );
      }
    };

    void initializeDatabase();
  }, []);

  if (databaseError) {
    return (
      <IonApp>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Error de base de datos</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>{databaseError}</p>
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }

  if (!databaseReady) {
    return (
      <IonApp>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Quiz móvil</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>Inicializando base de datos...</p>
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" element={<Home />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/personas" element={<PersonsPage />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
