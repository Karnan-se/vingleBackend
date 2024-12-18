import { ICloudinaryService } from "../entitties/interfaces/service.ts/IcloudinaryService"
import { IInstructor } from "../entitties/interfaces/tutor.ts/IInstructor"
import { IInstructorRepoInterface } from "../entitties/interfaces/tutor.ts/IInstructorRepo"
import { IuserRepository } from "../entitties/interfaces/user/userrepository"


interface Dependency {
    repository : {
        instructorRepository : IInstructorRepoInterface
        userRepository : IuserRepository
    },
    service :{
        cloudinaryService: ICloudinaryService
    }
   
}

export default  class InstructorService {
    private instructorRepository 
    private cloudinaryService
    private userRepository

    constructor(dependency:Dependency){
        this.instructorRepository = dependency.repository.instructorRepository
        this.userRepository = dependency.repository.userRepository
        this.cloudinaryService = dependency.service.cloudinaryService
    }
    async  CreateApplication(tutor:IInstructor){
        const {resume , certifications, ...otherDetails} = tutor;


        try {     
        let resumeUrl : string | null = null;
        if(resume){
            const isPDF = resume.mimetype === "application/pdf";
            resumeUrl = isPDF ? await this.cloudinaryService.uploadPDF(resume) :
            await this.cloudinaryService.uploadImage(resume)
        }

        let updatedCertifications:any = [];
        if(certifications && certifications.length> 0){
            updatedCertifications = await Promise.all(certifications.map(async (cert)=> {
                if(cert.certificateUrl) {
                    const isCertPDF = cert.certificateUrl.mimetype === "application/pdf";
                    const savedcertficate = isCertPDF ? await this.cloudinaryService.uploadPDF(cert.certificateUrl):
                    await this.cloudinaryService.uploadImage(cert.certificateUrl)
                    return{
                        title : cert.title || null,
                        issuer : cert.issuer || null,
                        data : cert.date || null,
                        certificateUrl: savedcertficate
                    }

                }
                return cert;
            })
        )
        }
        const tutorData = {
            ...otherDetails,
            resume:resumeUrl,
            certifications:updatedCertifications,
        }
        console.log(tutorData)


        const saveTutor = await this.instructorRepository.createUser(tutorData)
        return saveTutor;
            
        } catch (error) {
            console.log(error)
            throw new Error("Failed to create tutor application")
            
        }



    }


}