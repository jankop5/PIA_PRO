import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Employee } from '../model/employee.model';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    let typeString: string = localStorage.getItem("type");
    if(typeString){
      this.isCurrentUserAdmin = (JSON.parse(typeString)) == 0;
    }
    else{
      this.isCurrentUserAdmin = false;
    }
    
    this.initUploaders();
  }

  isCurrentUserAdmin: boolean = true;

  hide: boolean = true;
  message: string = "";
  isEmployee: boolean = false;

  username: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  website: string;
  personalData: string;
  title: string;
  cabinet: string;
  status: string;

  index: string;
  typeOfStudy: string;

  defaultFileName: string = "";
  fileInfoName: string;

  uploader: FileUploader;
  imageTypeOk: boolean = true;

  private initUploaders(){
    let URLSingle = 'http://localhost:4000/registerWithImage';
    this.fileInfoName = this.defaultFileName;
    this.uploader = new FileUploader({url: URLSingle, itemAlias: 'image', 
    allowedFileType: ['image']});
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; this.imageTypeOk = true; this.message = ""};
    this.uploader.onWhenAddingFileFailed = (item) => { this.imageTypeOk = false; this.message = "Slika mora biti u odgovarajucem formatu!"}
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      let res:Object = JSON.parse(response);
      if(res["message"] == 1){
        location.reload();
      }
      else if(res["message"] == 2){
        this.message = "Korisničko ime postoji!";
      }
    };
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileInfoName = fileInput.target.files[0].name;
    } 
  }

  sendImageToServer() {
    while(this.uploader.queue.length > 1 ){
      this.uploader.queue.shift();
    }
    
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("username", this.username);
      form.append("password", this.password);
      form.append("firstName", this.firstName);
      form.append("lastName", this.lastName);
      form.append("address", this.address);
      form.append("phone", this.phone);
      form.append("website",  this.website);
      form.append("personalData", this.personalData);
      form.append("title", this.title);
      form.append("cabinet", this.cabinet);
      form.append("status", this.status);
    };
    this.uploader.uploadAll();
    this.fileInfoName = this.defaultFileName;
  }

  clearLoader(){
    this.uploader.clearQueue();
    this.fileInfoName = this.defaultFileName;
  }

  registerUser(){
    if(this.isEmployee){
      if(!this.username){
        this.message = "Polje korisničko ime je obavezno!";
        return;
      }
      if(!this.password){
        this.message = "Polje lozinka je obavezno!";
        return;
      }
      if(!this.firstName){
        this.message = "Polje ime je obavezno!";
        return;
      }
      if(!this.lastName){
        this.message = "Polje prezime je obavezno!";
        return;
      }
      if(!this.address){
        this.message = "Polje adresa je obavezno!";
        return;
      }
      if(!this.title){
        this.message = "Polje zvanje je obavezno!";
        return;
      }
      if(!this.cabinet){
        this.message = "Polje kabinet je obavezno!";
        return;
      }
      if(!this.status){
        this.message = "Polje status je obavezno!";
        return;
      }
      // ako je neispravan tip fajla slike
      if(!this.imageTypeOk){
        return;
      }
      if(this.uploader.queue.length > 0){
        this.sendImageToServer();
      }
      else{
        let e = {
          username: this.username,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          phone: this.phone,
          website: this.website,
          personalData: this.personalData,
          title: this.title,
          cabinet: this.cabinet,
          status: this.status,
          type: 1
        };
        this.registerService.register(e).subscribe((res=>{
          if(res["message"] == 1){
            location.reload();
          }
          else if(res["message"]==2){
            this.message = "Korisničko ime postoji!";
          }
        }))
      }
    }
    else{
      if(!this.username){
        this.message = "Polje korisničko ime je obavezno!";
        return;
      }
      if(!this.password){
        this.message = "Polje lozinka je obavezno!";
        return;
      }
      if(!this.index){
        this.message = "Polje indeks je obavezno!";
        return;
      }
      if(!this.typeOfStudy){
        this.message = "Polje tip studija je obavezno!";
        return;
      }
      if(!this.firstName){
        this.message = "Polje ime je obavezno!";
        return;
      }
      if(!this.lastName){
        this.message = "Polje prezime je obavezno!";
        return;
      }
      if(!this.status){
        this.message = "Polje status je obavezno!";
        return;
      }
      if(this.username.length != 9 || this.username[0] != this.lastName[0].toLowerCase()
        || this.username[1] != this.firstName[0].toLowerCase() || this.username[8] != this.typeOfStudy[0]){
        this.message = "Korisničko ime mora biti u formatu piGGGGBBx!";
        return;
      }
      let regexIndex = new RegExp("[0-9]{4}/[0-9]{4}");
      if(!regexIndex.test(this.index)){
        this.message = "Indeks mora biti u formatu GGGG/BBBB!";
        return;
      }
      if(this.index.substr(2, 2) != this.username.substr(2, 2) ||
      this.index.substr(5, 4) != this.username.substr(4, 4)){
        this.message = "Korisničko ime i indeks se ne poklapaju!";
        return;
      }
      let s = {
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        index: this.index,
        typeOfStudy: this.typeOfStudy,
        status: this.status,
        type: 2
      };
      this.registerService.register(s).subscribe((res=>{
        if(res["message"] == 1){
          location.reload();
        }
        else if(res["message"]==2){
          this.message = "Korisničko ime postoji!";
        }
      }))
    }
  }

}
