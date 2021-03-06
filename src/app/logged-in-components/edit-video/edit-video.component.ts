import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../../services/video.service";
import {Video} from "../../models/video.model";
import {NotificationsService} from "angular2-notifications";
import {AppSettings} from "../../app.settings";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  public video : Video = {} as Video;
  public loading : boolean = false;
  public error : string = '';
  public file : any;
  public fileView : any = '';
  public staticEndPoint : string = '';
  public categories  = [];
  constructor(public route:ActivatedRoute,public router : Router,public videoService : VideoService,
              public notificationService : NotificationsService,public categoryService : CategoryService) { }

  ngOnInit() {
    this.video.category_id = 5
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.route.params.forEach(params => {
      this.video.id = parseInt(params["id"]);
      if (this.video.id) {
        this.getCategories();
      } else {
        this.router.navigate(['']);
      }
    });
  }

  public getCategories() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
      this.getVideo();
    },err=>{
      this.notificationService.error("خطأ في تحميل الفوائم",'',{timeOut:3000});
    })
  }

  public getVideo() {
    this.loading=true;
    this.videoService.getAuthVideo(this.video.id).subscribe(data=>{
      this.loading=false;
      this.error='';
      this.video = data;
      this.video.category = this.categories.filter(
        cat => cat._id == this.video.category_id)[0];
      if(this.video.category){
        this.video.category_name = this.video.category.title;
      }
    },err=>{
      this.loading=false;
      this.error=JSON.stringify(err.error);
    })
  }

  public AutocompleteTags = (text: string): Observable<any> => {
    return this.videoService.getTags(text);
  };

  public onItemAdded(event: any) {
    this.video.tags.splice(this.video.tags.indexOf(event.value), 1);
    this.video.tags.push(event.value)
  }

  public onFileChanged(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.video.file = event.target.files[0];
      var extn = this.video.file.name.split(".").pop();
      if (event.target.files[0].size / 1024 / 1024 > 3)
        this.notificationService.error("الحد الاقصى للصورة 3 ميجا بايت",'',{timeOut: 3000});
      if(extn == 'jpg' || extn == 'gif' || extn == 'png'){
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.fileView = (<FileReader>event.target).result;
        };

        reader.readAsDataURL(this.video.file);
      }
      else{
        this.notificationService.error('من فضلك اختار ملف من نوع صورة','',{timeOut: 3000})
      }

    }
  }

  public submit(videoForm:any){
    this.loading = true;
    this.video.category_id = this.categories.filter(
      cat => cat.title == this.video.category_name)[0]._id;
    this.videoService.editVideo(this.video).subscribe(data=>{
      this.loading = false;
      this.notificationService.success("تم التعديل بنجاح ","",{timeOut:3000});
      this.router.navigate(['/']);
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

}
