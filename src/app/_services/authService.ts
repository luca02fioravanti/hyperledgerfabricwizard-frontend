import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';


export const AUTH_HEADER = 'Authorization';
export const TOKEN_PREFIX = 'Bearer ';

@Injectable()
export class AuthService {
  private readonly TOKEN = 'token';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<HttpResponse<any>>('/api/login', {email, password}, {
      observe: 'response'
    }).pipe(
      map(response => this.setSession(response)),
      catchError(() => of(false))
    );
  }

  private setSession(response: HttpResponse<any>): boolean {
    if (response.headers.has(AUTH_HEADER)) {
      const header = response.headers.get(AUTH_HEADER).split(TOKEN_PREFIX);
      if (header.length === 2) {
        this.setToken(header[1]);
        return true;
      }
    }
    return false;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN, token);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN);
    this.router.navigateByUrl('/logout');
  }

  isLogged(): boolean {
    const token = this.getToken();
    if (token) {
      const helper = new JwtHelperService();
      if (helper.isTokenExpired(token)) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  getEmail(): string | null {
    if (!this.isLogged()) {
      return null;
    }
    const helper = new JwtHelperService();
    return helper.decodeToken(this.getToken()).sub;
  }
}

