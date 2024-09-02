export class AuthModel {
  token: string | undefined;
  refreshToken: string | undefined;
  expiresIn: Date | undefined;
  resourses: String = '';
  
  setAuth(auth: AuthModel) {
    this.resourses = auth.resourses;
    this.token = auth.token;
    this.refreshToken = auth.refreshToken;
    this.expiresIn = auth.expiresIn;
  }
}
