import Incomingmessage from 'ws'

declare module "http" {
  interface IncomingMessage {
    user?: user
  }
}
export interface user{
  id:string,
  displayName:string,
  username:string,
  email:string
}
//sdnjnf:
//snjdfnsnf
