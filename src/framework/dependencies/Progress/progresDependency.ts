import ProgressServcie from "../../../usecases/ProgressService.ts";
import ProgressRepository from "../../database/repositories/ProgressRepository.ts";
import ProgressController from "../../../adapters/controller/progressController.ts";

const Repository ={
    progresRepository : new ProgressRepository()
}



const progressService = new ProgressServcie({Repository})

export const progresssController = new ProgressController(progressService)