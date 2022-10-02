/* eslint-disable camelcase */
import PouchDb from "pouchdb";
import PouchDbMemoryAdapter from "pouchdb-adapter-memory";
import PouchDbFindPlugin from "pouchdb-find";

PouchDb.plugin(PouchDbMemoryAdapter);
PouchDb.plugin(PouchDbFindPlugin);

export type PouchDBDocument<T> = T & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta;
export interface PouchDatasourceParams {
  dbName: string;
  dbUrl?: string;
  cb?: Function;
}

export class PouchDatasource {
  static DocumentTypes = {
    Item: "item",
    Category: "category",
  };
  static dbName = "groceries";

  private constructor(readonly db: PouchDB.Database) {}

  static createPouchDbBrowser({
    dbName,
    dbUrl,
    cb,
  }: PouchDatasourceParams): PouchDatasource {
    // if (dbUrl && cb) {
    //   PouchDB.sync(dbName, `${dbUrl}/${dbName}`, {
    //     live: true,
    //     retry: true,
    //   })
    //     .on("change", cb)
    //     .on("complete", cb);
    // }
    return new PouchDatasource(new PouchDb(dbName));
  }

  static createPouchDbMemory({
    dbName,
  }: PouchDatasourceParams): PouchDatasource {
    const db = new PouchDatasource(new PouchDb(dbName, { adapter: "memory" }));

    return db;
  }

  static isPouchDbError(error: unknown): error is PouchDB.Core.Error {
    return "status" in (error as any);
  }
}
