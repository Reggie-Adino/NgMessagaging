import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IMessage } from '../../../models/common.module';
import { HttpClient } from '@angular/common/http';
import { apiEndpoint } from '../../../core/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  getAllMessages():Observable<IApiResponse<IMessage[]>>{
    return this.http.get<IApiResponse<IMessage[]>>(`${apiEndpoint.MessageEndPoint}`)
  }
}
