import { StatusCodes, ReasonPhrases } from "http-status-codes";
import errorCodes from "../errors/errorCode.ts";

class AppError extends Error {
  errorCode: number;
  StatusCode: number;

  constructor(
    errorCode: number = errorCodes.DEFAULT_ERROR,
    errorMessage: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    StatusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(errorMessage);
    this.errorCode = errorCode;
    this.StatusCode = StatusCode;
    
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static validation(message: string = ReasonPhrases.BAD_REQUEST): AppError {
    return new AppError(
      errorCodes.VALIDATION_ERROR,
      message,
      StatusCodes.BAD_REQUEST
    );
  }

  static authentication(message: string = ReasonPhrases.UNAUTHORIZED): AppError {
    return new AppError(
      errorCodes.AUTHENTICATION_ERROR,
      message,
      StatusCodes.UNAUTHORIZED
    );
  }

  static forbidden(message: string = ReasonPhrases.FORBIDDEN): AppError {
    return new AppError(
      errorCodes.FORBIDDEN_ERROR,
      message,
      StatusCodes.FORBIDDEN
    );
  }

  static conflict(message: string = ReasonPhrases.CONFLICT): AppError {
    return new AppError(
      errorCodes.CONFLICT,
      message,
      StatusCodes.CONFLICT
    );
  }
}

export default AppError;
