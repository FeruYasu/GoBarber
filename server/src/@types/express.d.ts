declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    io: {
      to: Function;
      sockets: {
        in: Function;
      };
    };
    connectedUsers: {
      [key: string]: string;
    };
  }
}
