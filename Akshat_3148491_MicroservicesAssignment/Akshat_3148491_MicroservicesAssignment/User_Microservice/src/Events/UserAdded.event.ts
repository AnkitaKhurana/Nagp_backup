import uuidv4 from 'uuid/v4';
import { IEvent } from '../Models/event.model';
import { UserEventContent } from '../Models/userevent.content.model';
import { constants } from '../constants'

export class UserAddedEvent implements IEvent {
    public id: string;
    public content: UserEventContent;
    public name: string = constants.USER_ADDED_EVENTNAME;

    constructor(userName: string) {
        this.id = uuidv4();
        this.content = {userName};
    }
}