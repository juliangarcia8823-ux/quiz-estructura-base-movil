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

import { Product } from '../../domain/models/Product';
import { productService } from '../../application/services';

const ProductsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudieron cargar los productos.'
      );
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');

    try {
      await productService.register({
        name,
        price: Number(price),
        stock: Number(stock),
      });

      setName('');
      setPrice('');
      setStock('');
      setMessage('Producto registrado correctamente.');
      await loadProducts();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'No se pudo registrar el producto.'
      );
    }
  };

  return (
    <IonContent className="ion-padding">
      <IonTitle>Registro de productos</IonTitle>

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
              type="number"
              label="Precio"
              labelPlacement="stacked"
              value={price}
              onIonInput={(event) => setPrice(event.detail.value ?? '')}
              placeholder="Ingrese el precio"
            />
          </IonItem>

          <IonItem>
            <IonInput
              type="number"
              label="Stock"
              labelPlacement="stacked"
              value={stock}
              onIonInput={(event) => setStock(event.detail.value ?? '')}
              placeholder="Ingrese el stock"
            />
          </IonItem>
        </IonList>

        <IonButton expand="block" type="submit">
          Guardar producto
        </IonButton>
      </form>

      {message && (
        <IonText color="primary">
          <p>{message}</p>
        </IonText>
      )}

      <IonTitle>Productos registrados</IonTitle>

      <IonList>
        {products.map((product) => (
          <IonItem key={product.id}>
            <IonText>
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
              <p>Stock: {product.stock}</p>
            </IonText>
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
};

export default ProductsPage;
