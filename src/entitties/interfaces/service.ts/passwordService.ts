interface IpasswordService {
    passwordHash(password:string|undefined):any;
    comparepassword(password:string|undefined, hashedPassword:String|undefined |string):any
}

export default IpasswordService;