
import * as minimongo  from "minimongo";

export class MinimongoFactory {
  private static _localDb: minimongo.IndexedDb = null;
  private static _remoteDb: minimongo.RemoteDb = null;
  private static _db: minimongo.HybridDb = null;



  private get db() {
    return MinimongoFactory._db;
  }
  private set db(db: any) {
    MinimongoFactory._db = db;
  }

  private get localDb() {
    return MinimongoFactory._localDb;
  }

  private set localDb(db: any) {
    MinimongoFactory._localDb = db;
  }

  private get remoteDb() {
    return MinimongoFactory._remoteDb;
  }

  private set remoteDb(db: any) {
    MinimongoFactory._remoteDb = db;
  }

  public getDatabase(): any {
    if (this.db === null) {
      this.initDatabase();
    }
    return this.db;
  }

  public getLocalDatabase(): any {
    console.log("getDB");
    //if (this.db === null) {
      this.initDatabase();
    //}
    return this.localDb;
  }

  private initDatabase(): void {
    var token = localStorage.getItem('token');
    this.localDb = new minimongo.IndexedDb({namespace: "spminipoc"});
    this.remoteDb = new minimongo.RemoteDb('http://localhost:4200/api/db/',token);
    this.db = new minimongo.HybridDb(this.localDb,this.remoteDb);
    this.localDb.addCollection('courses');
    this.remoteDb.addCollection('courses');
    this.db.addCollection('courses');

  }
}
