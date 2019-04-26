export interface ShareDoc {
applicationId: string;
    noOfShareholders: number;
    companyTradeLicense: string;
    memorandumOfAssociation: string;
    powerOfAttroney: string;
    shareHolderlist?: (ShareHolderlistEntity)[] | null;
  }
  export interface ShareHolderlistEntity {
    nationality: string;
    emiratesId: string;
    passport: string;
    visa: string;

}

  