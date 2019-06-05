import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  
  createDocument(code: string, name: string) {
    //console.log(formdata.code);
    return this.http.post<any>('/document', {docCode:code,docName:name} )
        .pipe(map(col => {
        
          return col;
        }));
}
getOneDoc(doccode:string)
{
  return this.http.get<any>('/document/'+doccode )
  .pipe(map(onedoc => {
  
    return onedoc;
  }));
}

getAllDocument() {
  //console.log(formdata.code);
  return this.http.get<any>('/document')
      .pipe(map(allcol => {
      
        return allcol;
      }));
}

deleteDocument(code:string) {
  //console.log(formdata.code);
  return this.http.delete<any>('/document/'+code)
      .pipe(map(delcol => {
      
        return delcol;
      }));
}

updateDoc(formdata:any)
{
  return this.http.put<any>('/document/',formdata)
  .pipe(map(updatedoc => {
  
    return updatedoc;
  }));
}

}
