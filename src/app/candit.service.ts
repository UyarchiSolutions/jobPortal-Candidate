import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Env } from './environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CanditService {
  baseUrl=Env.baseAPi;
  constructor(private http:HttpClient) { }


  jobs(data:any){
    return this.http.post(this.baseUrl+'/v1/candidateDetail/candidateSearch',data,{headers:{auth:Cookie.get('tokens')}})
  }
  @Output() get_token: EventEmitter<String> = new EventEmitter();
  @Output() name: EventEmitter<String> = new EventEmitter();
    set_current_token(token:any)
    {
        this.get_token.emit(token);
    }
    get_usename(name:any){
      console.log(name,"sds")
      this.name.emit(name)
    }
}
