import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
