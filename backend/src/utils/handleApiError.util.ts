import { AppError } from "../token/AppError";

export const handleApiError = (error: any, errorMessage: string, errorCode: number = 500) => {
    const errorData = error instanceof Error 
        ? error.message
        : errorMessage;
    
    const code = error instanceof AppError 
        ? error.statusCode
        : errorCode;

    throw new AppError(errorMessage, code, errorData);
}