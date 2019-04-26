import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { DatePipe,formatDate  } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class BasicDetailsService {

  constructor(private http: HttpClient)
 { }

 transformDate(date) {
  return formatDate(date, 'yyyy-MM-dd','en-in');
}

 test(formData:any) {
  return this.http.post<any>('/posts',  formData)
      .pipe(map(user => {
          return user;
      }));
}

registerapplicant(formdata:any)
{
  return this.http.post<any>('/registerapplicant',  formdata)
  .pipe(map(register => {
      return register;
  }));
}

newLoanExisting(appid:string,appemail:string,appcont:string)
{
  return this.http.post<any>('/application',{applicantionId:appid,
	applicantEmailId:appemail,
	applicantControlType:appcont})
  .pipe(map(data => {
      return data;
  }));
}

generateAppid()
{
  return this.http.get<any>('/generateappid')
  .pipe(map(appid => {
      return appid;
  })); 
}

companyDetail(formdata:any)
{
  let parent=0;
  if(formdata.parentCompanyApplicable.length>0)
  {
    parent=1;
  }
  return this.http.post<any>('/submitcompanydetails',{

    applicationId : formdata.applicationId,
    companyRegistrationDate :this.transformDate(formdata.companyRegistrationDate),
    tradeLicenseNumber : formdata.tradeLicenseNumber,
    tradeLicenseExpirydate :this.transformDate(formdata.tradeLicenseExpirydate),
    placeofIssue : formdata.placeofIssue,
    countryOfDomicile : formdata.countryOfDomicile,
    yearsInBuisness : formdata.yearsInBuisness,
    noOfEmployees : formdata.noOfEmployees,
    companyWebSite : formdata.companyWebSite,
    legalStatus : formdata.legalStatus,
    parentCompanyApplicable : parent,
    nob:formdata.nob,
    tob:formdata.tob,
    parentCompanyName : formdata.parentCompanyApplicable
  })
  .pipe(map(data => {
      return data;
  })); 
}

getCompanyDetail(AppId:string)
{
  return this.http.get<any>('/companydetails/'+AppId)
  .pipe(map(data => {
      return data;
  })); 
}

addressSave(formData:any)
{
  formData.telephoneOffice="971"+formData.telephoneOffice
  
  return this.http.post<any>('/submitaddressdetails',formData)
  .pipe(map(data => {
      return data;
  })); 
}

getAddress(AppId:string)
{
  return this.http.get<any>('/addressdetails/'+AppId)
  .pipe(map(address => {
      return address;
  })); 
}

getAppDetail(AppId:string)
{
  return this.http.get<any>('/applicationdetails/'+AppId)
  .pipe(map(detail => {
      return detail;
  }));  
}

allExistingApp(email:string)
{
  return this.http.get<any>('/userdtails/'+email)
  .pipe(map(allApp => {
      return allApp;
  })); 
}


saveShareHolderDetail(data:any)
{
 
  for(let i=0;i<data.borrowerDetailsForm.length;i++)
  {
    // console.log( data.borrowerDetailsForm[i].dateofBirth);
    data.borrowerDetailsForm[i].dateofBirth=this.transformDate(data.borrowerDetailsForm[i].dateofBirth)
    data.borrowerDetailsForm[i].expirydate=this.transformDate(data.borrowerDetailsForm[i].expirydate)
    data.borrowerDetailsForm[i].passportExpiryDate=this.transformDate(data.borrowerDetailsForm[i].passportExpiryDate)
    if( data.borrowerDetailsForm[i].visaExpiryDate)
    {
      data.borrowerDetailsForm[i].visaExpiryDate=this.transformDate(data.borrowerDetailsForm[i].visaExpiryDate)

    }

  }
 

  return this.http.post<any>('/submitborrowerdetails',data)
  .pipe(map(detail => {
      return detail;
  })); 
}






}
