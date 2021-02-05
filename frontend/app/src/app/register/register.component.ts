import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Student } from '../model/student.model';
import { RegisterService } from '../services/register.service';

/**
 * @module
 * komponenta za registraciju
 */
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

  /**
   * inicijalizacija fajl loadera koji se koriste pri uploadu fajlova
   */
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

  /**
  * ispis imena odabranog fajla radi sto boljeg simuliranja input type file
  * @param fileInput html input
  */
  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileInfoName = fileInput.target.files[0].name;
      let img = new Image();
      img.src = window.URL.createObjectURL(fileInput.target.files[0]);
      img.onload = () => {
        if(img.width > 300 || img.height > 300){
          this.imageTypeOk = false; this.message = "Slika moze biti maksimalno 300x300!"
        }
      }
    } 
  }

  /**
   * slanje profilne slike na server
   */
  sendImageToServer() {
    while(this.uploader.queue.length > 1 ){
      this.uploader.queue.shift();
    }
    if(!this.phone){
      this.phone = "";
    }
    if(!this.website){
      this.website = "";
    }
    if(!this.personalData){
      this.personalData = "";
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

  /**
  * brisanje odabranih fajlova iz reda u uploaderu
  */
  clearLoader(){
    this.uploader.clearQueue();
    this.fileInfoName = this.defaultFileName;
  }

  /**
   * registracija oba tipa korisnika
   */
  registerUser(){
    if(this.isEmployee){ // registracija zaposlenog
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
    else{ // registracija studenta
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



  fileInfoNameCSV: string = "";
  messageCSV: string = "";
  public records: any[] = [];
  
  /**
   * provera i parsiranje csv fajla
   * @param $event input tipa fajl
   */
  uploadCSVListener($event: any): void {  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
      this.fileInfoNameCSV = files[0].name;
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
  
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 
        console.log(this.records); 
      };
  
    } else {  
      this.messageCSV = "Fajl mora biti u csv formatu";
    }  
  }  
  
  /**
   * dohvatanje podataka iz csv fajla
   * @param csvRecordsArray niz podataka o studentima
   * @param headerLength broj kolona
   */
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: string[] = [];  
        csvRecord[0] = curruntRecord[0].trim();
        csvRecord[1] = curruntRecord[1].trim(); 
        csvRecord[2] = curruntRecord[2].trim();  
        csvRecord[3] = curruntRecord[3].trim();  

        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  
  
  /**
   * provera da li je fajl u dobrom formatu
   * @param file fajl
   */
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  /**
   * dohvatanje prvog reda iz csv fajla tj. imena kolona
   * @param csvRecordsArr niz podataka
   */
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  

  /**
   * registracija studenta ucitanih iz csv fajla
   */
  registerFromCsv(){
    for (let i = 0; i < this.records.length; i++) {

      let username = this.records[i][0];
      let firstName = this.records[i][2];
      let lastName = this.records[i][3];
      if(username.length != 9 || username[0] != lastName[0].toLowerCase()
      || username[1] != firstName[0].toLowerCase()){
      this.messageCSV = "Korisničko ime mora biti u formatu piGGGGBBx!";
      return;
    }
      let s = {
        username: username,
        password: this.records[i][1],
        firstName: firstName,
        lastName: lastName,
        index: "20" + username.substr(2, 2) + "/" + username.substr(4, 4),
        typeOfStudy: username[8],
        status: "aktivan",
        type: 2
      };
      this.registerService.register(s).subscribe((res=>{
        if(res["message"]==2){
          this.messageCSV = "Korisničko ime postoji!";
          return;
        }
      }))
    }
    if(this.records.length > 0){
      location.reload();
    }
  }
}
