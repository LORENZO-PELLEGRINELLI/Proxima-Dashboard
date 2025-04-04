// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Friend {
  id: number;
  name: string;
  age: number;
}

//Database Friends
const db = new Dexie("SensorData") as Dexie & {
  friends: EntityTable<
    Friend,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  friends: "++id, name, age", // primary key "id" (for the runtime!)
});

//Database animals
interface Animals {
  id: number;
  name: string;
  species: string;
}

const animals_db = new Dexie("AnimalsDatabase") as Dexie & {
  animals: EntityTable<
    Animals,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
animals_db.version(1).stores({
  animals: "++id, name, species", // primary key "id" (for the runtime!)
});

export type { Friend };
export type { animals_db };
export { db };
export default db;
