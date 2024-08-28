import { environment } from 'src/environments/environment';
import { AuthModel } from './auth.model';
import { RoleModel } from './role.model';

export class UserModel extends AuthModel {
  _id: any = "";
  user_name: string = "";
  password: string = "";
  profile_photo: string = "";

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this._id = user._id;
    this.user_name = user.user_name || '';
    this.password = user.password || '';
    this.full_name = user.full_name || '';
    this.email = user.email || '';
    this.resources = user.resources || '';
    this.profile_photo = environment.apiIMG + '/profile_photos/' + user.profile_photo || './assets/media/avatars/blank.png';
  }
}
