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

import { Person } from '../../domain/models/Person';
import { personService } from '../../application/services';

const PersonsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [persons, setPersons] = useState<Person[]>([]);
  const [message, setMessage] = useState('');

  const loadPersons = async () => {
    try {
      const data = await personService.getAll();
      setPersons(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar las personas.'
      );
    }
  };

  useEffect(() => {
    void loadPersons();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    try {
      await personService.register({
        name,
        document,
        phone,
      });

      setName('');
      setDocument('');
      setPhone('');
      setMessage('Persona registrada correctamente.');
      await loadPersons();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo registrar la persona.'
      );
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonTitle>Registro de personas</IonTitle>

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
              label="Documento"
              labelPlacement="stacked"
              value={document}
              onIonInput={(event) => setDocument(event.detail.value ?? '')}
              placeholder="Ingrese el documento"
            />
          </IonItem>

          <IonItem>
            <IonInput
              type="tel"
              label="Teléfono"
              labelPlacement="stacked"
              value={phone}
              onIonInput={(event) => setPhone(event.detail.value ?? '')}
              placeholder="Ingrese el teléfono"
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" type="submit">
          Guardar persona
        </IonButton>
      </form>

      {message && (
        <IonText color="primary">
          <p>{message}</p>
        </IonText>
      )}

      <IonTitle>Personas registradas</IonTitle>

      <IonList>
        {persons.map((person) => (
          <IonItem key={person.id}>
            <IonText>
              <h2>{person.name}</h2>
              <p>Documento: {person.document}</p>
              <p>Teléfono: {person.phone}</p>
            </IonText>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default PersonsPage;
