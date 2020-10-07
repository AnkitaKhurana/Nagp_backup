import { Injectable } from '@angular/core';
import { InMemoryDbService,RequestInfo,
  STATUS,
  ResponseOptions } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class MemoryService implements InMemoryDbService {
  createDb() {
    let posts = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];
    return {posts};
  }
  post(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;
    if (collectionName === 'posts') {
      let data = requestInfo.utils.getJsonBody(requestInfo.req);
      const collection = requestInfo.collection;
    //  data = JSON.parse(data);
        data = data.params;
      collection.push(data);

      const options: ResponseOptions = {
        body: { data },
        status: STATUS.OK,
        headers: requestInfo.headers,
        url: requestInfo.url,
      };

      return requestInfo.utils.createResponse$(() => options);
    }
  }
  put(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;
    if (collectionName === 'posts') {
      let data = requestInfo.utils.getJsonBody(requestInfo.req);
      const collection = requestInfo.collection;
    //  data = JSON.parse(data);
        data = data.params;
        let objIndex = collection.findIndex((obj => obj.id == data.id));

      collection[objIndex] = data;

      const options: ResponseOptions = {
        body: { data },
        status: STATUS.OK,
        headers: requestInfo.headers,
        url: requestInfo.url,
      };

      return requestInfo.utils.createResponse$(() => options);
    }
  }
}