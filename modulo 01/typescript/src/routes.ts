import { Request, Response } from 'express'
import createUser from './services/CreateUser';

export function helloWorld(request : Request, response: Response) {
    const user = createUser({
        email: 'dhann@gmail.com', 
        password: '123',
        techs: ['Go', 'Node', {title: 'kek', experience: 20}]
    });

    return response.json({message: 'Hello World'});
}