export interface ShareHolder {

        applicationId: string;
        borrowerDetailsForm?: (BorrowerDetailsFormEntity)[] | null;
      }
      export interface BorrowerDetailsFormEntity {
        title: string;
        firstName: string;
        middleName: string;
        lastName: string;
        gender: string;
        designationCode: string;
        emailId: string;
        dateofBirth: string;
        sharePercentage: number | string;
        mobileNumber: string;
        martialStatus: string;
        eidNumber: string;
        expirydate: string;
        nationality: string;
        passportNumber: string;
        passportExpiryDate: string;
        visaNumber: string;
        visaExpiryDate: string;
        homeCountryAddress?: string | null;
        uaeAddress?: string | null;
      }
      
