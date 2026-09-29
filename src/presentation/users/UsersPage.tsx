import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonText,
  IonTitle,
} from '@ionic/react';
import { FormEvent, useEffect, useState } from 'react';

import { User } from '../../domain/models/User';
import { userService } from '../../application/services';

const UsersPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState('');

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar los usuarios.'
      );
    }
  };

  useEffect(() => {
    void loadUsers();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    try {
      await userService.register({
        name,
        email,
        username,
      });

      setName('');
      setEmail('');
      setUsername('');
      setMessage('Usuario registrado correctamente.');
      await loadUsers();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo registrar el usuario.'
      );
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonTitle>Registro de usuarios</IonTitle>

      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              value={name}
              onIonInput={(event) => setName(event.detail.value ?? '')}
              placeholder="Ingrese el nombre"
            />
          </IonItem>

          <IonItem>
            <IonInput
              type="email"
              label="Correo electrónico"
              labelPlacement="stacked"
              value={email}
              onIonInput={(event) => setEmail(event.detail.value ?? '')}
              placeholder="Ingrese el correo"
            />
          </IonItem>

          <IonItem>
            <IonInput
              label="Usuario"
              labelPlacement="stacked"
              value={username}
              onIonInput={(event) => setUsername(event.detail.value ?? '')}
              placeholder="Ingrese el usuario"
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" type="submit">
          Guardar usuario
        </IonButton>
      </form>

      {message && (
        <IonText color="primary">
          <p>{message}</p>
        </IonText>
      )}

      <IonTitle>Usuarios registrados</IonTitle>

      <IonList>
        {users.map((user) => (
          <IonItem key={user.id}>
            <IonText>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>Usuario: {user.username}</p>
            </IonText>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default UsersPage;
