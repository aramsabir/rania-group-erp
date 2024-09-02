import { environment } from 'src/environments/environment';
import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  _id: number| undefined;;
  user_name: string| undefined;;
  password: string| undefined;;
  full_name: string| undefined;;
  resources: string = "";;
  email: string| undefined;;
  profile_photo: string| undefined;;
  unit_id: object = {};
  job_title_id: object = {};
  job_title: string | undefined;
  manager_id: object = {};
  company_id: object = {};
  phone: string| undefined;;
  code: string| undefined;;
  gender: string| undefined;;
  type: string| undefined;;
  ref_link: string| undefined;;
  companies: object[] = [];
  active: boolean = false;


  setUser(_user: unknown) {
    const user = _user as UserModel;
    this._id = user._id;
    this.user_name = user.user_name || '';
    this.password = user.password || '';
    this.resources = user.resources || '';
    this.full_name = user.full_name || '';
    this.email = user.email || '';
    this.profile_photo = environment.apiIMG + '/profile_photos/' + user.profile_photo || './assets/media/avatars/blank.png';
    this.unit_id = user.unit_id || {};
    this.job_title_id = user.job_title_id || user.job_title || {};
    this.manager_id = user.manager_id || {};
    this.company_id = user.company_id || {};
    this.phone = user.phone || '';
    this.code = user.code || '';
    this.gender = user.gender || '';
    this.type = user.type || '';
    this.ref_link = user.ref_link || '';
    this.companies = user.companies || [];
    this.active = user.active;
  }
}
