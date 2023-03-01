import * as SQLite from "expo-sqlite";

export default class Database {
  constructor() {
    this.db = SQLite.openDatabase("BdCreditApp.db");
    this.createTables();
  }

  createTables() {
    this.db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS personas (id INTEGER PRIMARY KEY AUTOINCREMENT, dni TEXT, nombre TEXT, apellido TEXT, telefono TEXT, direccion TEXT, referencia TEXT)",
        []
      );
    });
  }

  insertPersona(dni, nombre, apellido, telefono, direccion, referencia) {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO personas (dni, nombre, apellido, telefono, direccion, referencia) VALUES (?, ?, ?, ?, ?, ?)",
          [dni, nombre, apellido, telefono, direccion, referencia],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              resolve();
            } else {
              reject(new Error("Ha ocurrido un error al guardar los datos."));
            }
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

  getAllPersonas() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM personas",
          [],
          (_, result) => {
            resolve(result.rows._array);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
}
