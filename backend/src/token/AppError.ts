export class AppError extends Error {
    constructor(
        message: string,
        public statusCode:number,
        public data: any
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
