import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Network} from '../_models/fabric/network';
import {Observable, of} from 'rxjs';
import {NetworkConfig} from '../_models/networkConfig';
import {catchError} from 'rxjs/operators';
import {User} from '../_models/user';
import {NetworkZip} from '../_models/networkZip';
import {Shared} from '../_models/shared';

@Injectable()
export class Server {

  constructor(private httpClient: HttpClient) {
  }

  signup(user: User): Observable<number> {
    return this.httpClient.post<number>('/api/user/signup', user).pipe(catchError(() => of(-1)));
  }

  addNetworkConfig(network: Network): Observable<HttpResponse<any>> {
    return this.httpClient.post('/api/network/add', network, {
      observe: 'response'
    });
  }

  getZip(networkId: number, zipName: string): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(`/api/zip/${networkId}/${zipName}`, {
      headers: {accept: 'application/zip'},
      responseType: 'blob',
      observe: 'response'
    });
  }

  deleteNetworkConfig(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/network/${id}`).pipe(catchError(() => of(false)));
  }

  listNetworkConfigs(): Observable<NetworkConfig[]> {
    return this.httpClient.get<NetworkConfig[]>('/api/network/list').pipe(catchError(() => of([])));
  }

  getNetworkConfiguration(id: number): Observable<NetworkConfig | undefined> {
    return this.httpClient.get<NetworkConfig | undefined>(`/api/network/${id}`).pipe(catchError(() => of(undefined)));
  }

  availableZips(networkId: number): Observable<NetworkZip[]> {
    return this.httpClient.get<NetworkZip[]>(`/api/zip/list/${networkId}`).pipe(catchError(() => of([])));
  }

  sharedInfo(zipId: number): Observable<Shared | undefined> {
    return this.httpClient.get<NetworkZip[]>(`/api/shared/${zipId}`).pipe(catchError(() => of(undefined)));
  }

  share(shared: Shared, email: string): Observable<number> {
    return this.httpClient.post<number>('/api/shared/share', {id: shared.id, email}).pipe(catchError(() => of(-1)));
  }

  unshare(shared: Shared): Observable<boolean> {
    return this.httpClient.post<boolean>('/api/shared/unshare', {id: shared.id}).pipe(catchError(() => of(false)));
  }

  sharedWithMe(): Observable<Shared[]> {
    return this.httpClient.get<Shared[]>(`/api/shared/list`).pipe(catchError(() => of([])));
  }

  profile(): Observable<User | undefined> {
    return this.httpClient.get<User | undefined>('/api/user/profile').pipe(catchError(() => of(undefined)));
  }

  closeAccount(): Observable<boolean> {
    return this.httpClient.get<boolean>('/api/user/close').pipe(catchError(() => of(false)));
  }
}
