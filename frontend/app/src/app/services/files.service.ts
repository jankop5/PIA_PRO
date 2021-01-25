import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  
  URLSingle = 'http://localhost:4000/upload';

  public uploaderSingle:FileUploader = new FileUploader({url: this.URLSingle, itemAlias: 'myFile'});
  
  constructor(private http: HttpClient) { 
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploaderSingle.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploaderSingle.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
        console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  uri = 'http://localhost:4000';

}
