import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menu (id integer primary key not null, name text, description text, price float, image text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenu() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menu', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenu(menu) {
  db.transaction((tx) => {
    const values = menu.map((item) => [
      item.id,
      item.name,
      item.description,
      item.price,
      item.image,
      item.category
    ]);

    const placeholders = menu.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
    const sql = `insert into menu (id, name, description, price, image, category) VALUES ${placeholders}`;
    tx.executeSql(sql, [].concat(...values));
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from menu where name like '%' || ? || '%'`,
        [query],
        (_, result) => {
          const filteredItems = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            if (activeCategories.includes(row.category)) {
              filteredItems.push(row);
            }
          }
          resolve(filteredItems);
        },
        (_, error) => {
          console.log('SQL Error:', error);
          reject(error);
        }
      );
    });
  });
}