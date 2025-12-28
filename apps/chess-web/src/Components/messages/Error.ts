type ErrorName = 'SESSION_ERROR' | 'GAME_CREATION_ERROR' | 'MOVE_ERROR' | 'CONNECTION_ERROR' | 'SIGNIN_ERROR' | 'SIGNOUT_ERROR'
export class ProjectError extends Error{
    name:ErrorName;
    message: string;
    cause?: any;

    constructor({name,message,cause}:{name:ErrorName,message:string,cause:any}){
        super();
        this.name=name;
        this.message=message;
        this.cause=cause;
    }
}