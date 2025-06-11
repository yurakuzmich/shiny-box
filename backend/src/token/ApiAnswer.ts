export class ApiAnswer {
    constructor(
        public success: boolean, 
        public message: string,
        public data: any
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}