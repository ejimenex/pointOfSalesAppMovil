import { Observable } from 'rxjs';

export interface IService<TEntity, TKey> {
  baseUrl: string;
  getAll(): Observable<TEntity[]>;
  getById(id: string): Observable<TEntity>;
  post(entity: TEntity): Observable<Object>;
  patch(entity: TEntity, id: TKey): Observable<Object>;
  put( id: TKey, entity: TEntity): Observable<Object>
  delete(id: TKey): Observable<Object>;
}