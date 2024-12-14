
export interface GooglePayload {
    iss?: string; 
    azp?: string;
    aud?: string; 
    sub?: string; 
    email?: string; 
    email_verified?: boolean; 
    name?: string; 
    picture?: string; 
    given_name?: string; 
    family_name?: string; 
    locale?: string; 
    iat?: number;
    exp?: number; 
    [key: string]: any; 
  }
  
  
  export interface IGoogleService {
    tokenVerify(token: string): Promise<GooglePayload | undefined>;
  }
  