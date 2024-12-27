import IGenerateTutorPassword from "../../../entitties/interfaces/tutor.ts/IGenerateTutorPassword";

export default class GenerateTutorPassword implements IGenerateTutorPassword {
    constructor() {}

    async Password(): Promise<string> {
        const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowerCase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const specialChars = "@$!%*?&";
        
        // Initialize result as an array of characters
        let result: string[] = [
            upperCase[Math.floor(Math.random() * upperCase.length)],
            numbers[Math.floor(Math.random() * numbers.length)],
            specialChars[Math.floor(Math.random() * specialChars.length)],
        ];

        const allChars = upperCase + lowerCase + numbers + specialChars;
        while (result.length < 8) {
            result.push(allChars[Math.floor(Math.random() * allChars.length)]);
        }

        
        result = result.sort(() => Math.random() - 0.5);

    
        const password = result.join('');

        console.log(password);  

        return password;  
    }
}
