export enum ApiMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
  }
  
  export enum ApiEndPoints {

    ListUsers='users?skip={{skip}}&limit={{limit}}&sort={{sort}}&search={{search}}',
    FindUser='users',
    PostUser='user',
    PutUser='user',

    GetAllRoles='roles??skip={{skip}}&limit={{limit}}&sort={{sort}}',
    PostRole='role',

    SignOut = 'auth/login',
    Check = ''
  }


