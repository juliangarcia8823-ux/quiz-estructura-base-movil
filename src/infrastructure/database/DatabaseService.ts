import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

class DatabaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private initialized = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    if (!Capacitor.isNativePlatform()) {
      await this.initializeWeb();
    }

    const databaseName = 'quiz_app';

    const consistency = await this.sqlite.checkConnectionsConsistency();
    const isConnection = (await this.sqlite.isConnection(databaseName, false)).result;

    if (consistency.result && isConnection) {
      this.db = await this.sqlite.retrieveConnection(databaseName, false);
    } else {
      this.db = await this.sqlite.createConnection(
        databaseName,
        false,
        'no-encryption',
        1,
        false
      );
    }

    await this.db.open();

    await this.createTables();

    this.initialized = true;
  }

  private async initializeWeb(): Promise<void> {
    const jeepSqlite = document.querySelector('jeep-sqlite');

    if (!jeepSqlite) {
      const element = document.createElement('jeep-sqlite');
      document.body.appendChild(element);
    }

    await customElements.whenDefined('jeep-sqlite');

    const jeepElement = document.querySelector('jeep-sqlite') as unknown as HTMLElement & {
      initWebStore: () => Promise<void>;
    };

    await jeepElement.initWebStore();
  }

  private async createTables(): Promise<void> {
    if (!this.db) {
      throw new Error('La base de datos no está inicializada.');
    }

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        username TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS persons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        document TEXT NOT NULL,
        phone TEXT NOT NULL
      );
    `);
  }

  async run(
    statement: string,
    values: (string | number | null)[] = []
  ): Promise<void> {
    if (!this.db) {
      throw new Error('La base de datos no está inicializada.');
    }

    await this.db.run(statement, values);
  }

  async query<T>(
    statement: string,
    values: (string | number | null)[] = []
  ): Promise<T[]> {
    if (!this.db) {
      throw new Error('La base de datos no está inicializada.');
    }

    const result = await this.db.query(statement, values);

    return (result.values ?? []) as T[];
  }
}

export const databaseService = new DatabaseService();
