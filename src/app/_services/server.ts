import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Network} from '../_models/fabric/network';
import {Observable, of} from 'rxjs';
import {NetworkConfig} from '../_models/networkConfig';
import {catchError} from 'rxjs/operators';
import {User} from '../_models/user';

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

  listNetworkConfigs(): Observable<NetworkConfig[]> {
    return this.httpClient.get<NetworkConfig[]>('/api/network/list').pipe(catchError(() => of([])));
  }

  getNetworkConfiguration(id: number): Observable<NetworkConfig | undefined> {
    return this.httpClient.get<NetworkConfig | undefined>(`/api/network/${id}`).pipe(catchError(() => of(undefined)));
  }
}
