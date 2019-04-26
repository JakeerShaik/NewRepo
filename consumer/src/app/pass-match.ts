import {AbstractControl} from '@angular/forms';
export class PassMatch {
    // static MatchPassword(AC: AbstractControl) {
    //     let password = AC.get('applicantPassword').value; // to get value in input tag
    //     let confirmPassword = AC.get('confirmPass').value; // to get value in input tag
    //      if(password != confirmPassword) {
    //         // console.log('false');
    //          AC.get('confirmPass').setErrors( {MatchPassword: true} )
    //      } else {
    //          //console.log('true');
    //          return   AC.get('confirmPass').setErrors( {MatchPassword: null})
    //          //return null
    //      }
    //  }



      /**
   * Match two controls if they are the same
   * 
   */
  static Match(firstControlName, secondControlName) {
    return (AC: AbstractControl) => {
      let firstControlValue = AC.get(firstControlName).value; // to get value in input tag
      let secondControlValue = AC.get(secondControlName).value; // to get value in input tag
      if (firstControlValue != secondControlValue) {
        AC.get(secondControlName).setErrors({MatchFields: true});
      //  console.log(false);
      }
     
      else {
       // console.log(true);
      //  return null
       AC.get(secondControlName).setErrors(null);
        
      }
    };
  }
}
