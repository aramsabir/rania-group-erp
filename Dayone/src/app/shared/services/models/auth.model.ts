export class AuthModel {
  token: string = '';
  email: string = '';
  full_name: string = '';
  resources: string = '';

  setAuth(auth: AuthModel) {
    this.token = auth.token;
    this.email = auth.email;
    this.full_name = auth.full_name;
    this.resources = auth.resources;
  }
}
