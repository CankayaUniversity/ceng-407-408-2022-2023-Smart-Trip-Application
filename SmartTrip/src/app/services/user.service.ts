import {Injectable} from '@angular/core';

export interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private accessToken: string;
  private user: User;

  constructor() {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken && accessToken.length) {
      this.accessToken = accessToken;
      this.parseAccessToken();
    }
  }

  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    this.parseAccessToken();
    window.localStorage.setItem("access_token", this.accessToken);
  }

  private parseAccessToken(): void {
    const userData: any = JSON.parse(atob(this.accessToken.split('.')[1]));
    this.user = {
      id: userData.id,
      username: userData.name,
      email: userData.sub,
    };
 }

 getAccessToken(): string {
    return this.accessToken;
 }

 getUser(): User {
    return this.user;
 }

}
