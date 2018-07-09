import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  readonly apiKey: string = 'videos';
  constructor(private http: HttpClient) { }

  public getVideos(limit?:Number,order?:String,orderBy?:string): Observable<any>{
    let params : string = '';
    if(limit){
      params +='?limit='+limit
    }
    if(order){
      params +='&order='+order
    }
    if(orderBy){
      params +='&orderBy='+orderBy
    }
    return this.http.get(this.apiKey+params)
  }

  public getVideo(id?:Number): Observable<any>{
    return this.http.get(this.apiKey+'/'+id);
  }

  likeVideo(id: Number): Observable<any> {
    return this.http.get('auth/like/'+id);
  }

  isVideoLiked(id: Number): Observable<any> {
    return this.http.get('auth/isliked/'+id);
  }
}