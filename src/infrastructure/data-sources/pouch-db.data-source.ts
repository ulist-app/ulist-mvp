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

  static createPouchDbBrowser(params: PouchDatasourceParams): PouchDatasource {
    return PouchDatasource.createPouchDb({ ...params });
  }

  static createPouchDbMemory(params: PouchDatasourceParams): PouchDatasource {
    return PouchDatasource.createPouchDb({
      ...params,
      options: { adapter: "memory" },
    });
  }

  static isPouchDbError(error: unknown): error is PouchDB.Core.Error {
    return "status" in (error as any);
  }

  private static createPouchDb({
    dbName,
    dbUrl,
    cb,
    options,
  }: PouchDatasourceParams & {
    options?: PouchDB.Configuration.DatabaseConfiguration;
  }): PouchDatasource {
    const remoteDb = `${dbUrl}/${dbName}`;
    if (dbUrl && cb) {
      PouchDb.sync(dbName, remoteDb, {
        live: true,
        retry: true,
      })
        .on("error", (error) => {
          console.error("[SYNC ERROR]", error.toString());
        })
        .on("active", () => {
          console.debug("[SYNC ACTIVE]");
        })
        .on("change", (info) => {
          console.debug("[SYNC CHANGES]", JSON.stringify(info, null, 2));
          cb();
        })
        .on("complete", (info) => {
          console.debug("[SYNC COMPLETE]", JSON.stringify(info, null, 2));
          cb();
        });
    }
    return options
      ? new PouchDatasource(new PouchDb(dbName, options))
      : new PouchDatasource(new PouchDb(dbName));
  }
}
