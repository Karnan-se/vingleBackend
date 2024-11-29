interface IpasswordService {
    passwordHash(password:string|undefined):any;
    comparepassword(password:string|undefined, hashedPassword:string|undefined):any
}

export default IpasswordService;