import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined || user.username == undefined || user.password == undefined )
    {
      return false
    }
    else
         return true;
  }

  // validate login
  validateLogin(user){
    if(user.username == undefined || user.password == undefined )
    {
      return false
    }
    else
         return true;
  }

}
