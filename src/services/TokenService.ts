import { Cookies } from 'react-cookie';

class TokenService {
  cookie = new Cookies();

  setToken(token: string) {
    this.cookie.set('token', token, { path: '/' });
  }
  setId(id: string) {
    this.cookie.set('id', id, { path: '/' });
  }
  setName(name: string) {
    this.cookie.set('name', name, { path: '/' });
  }
  setEmail(email: string) {
    this.cookie.set('email', email, { path: '/' });
  }
  getToken() {
    return this.cookie.get('token');
  }
  getId() {
    return this.cookie.get('id');
  }
  getName() {
    return this.cookie.get('name');
  }
  getEmail() {
    return this.cookie.get('email');
  }
  logout() {
    this.cookie.remove('token');
    this.cookie.remove('id');
  }
  get headers() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }
}
const api = new TokenService();
export default api;
