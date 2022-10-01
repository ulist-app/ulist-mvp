/* eslint-disable camelcase */
import PouchDb from "pouchdb";
import PouchDbMemoryAdapter from "pouchdb-adapter-memory";
import PouchDbFindPlugin from "pouchdb-find";

PouchDb.plugin(PouchDbMemoryAdapter);
PouchDb.plugin(PouchDbFindPlugin);

export type PouchDBDocument<T> = T & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;

export class PouchDatasource {
  private constructor(readonly db: PouchDB.Database) {
    this.db
      .createIndex({
        index: { fields: ["type"] },
      })
      .then(() => {
        console.log("Indexes created.");
      })
      .catch((err) => {
        console.error("Error creating indexes:", err.toString());
      });
  }

  static createPouchDbBrowser(databaseURL: string): PouchDatasource {
    return new PouchDatasource(new PouchDb(databaseURL));
  }

  static createPouchDbMemory(databaseURL: string): PouchDatasource {
    return new PouchDatasource(new PouchDb(databaseURL, { adapter: "memory" }));
  }

  static isPouchDbError(error: unknown): error is PouchDB.Core.Error {
    return "status" in (error as any);
  }

  static DocumentTypes = {
    Item: "item",
    Category: "category",
  };
}
