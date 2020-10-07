import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS,
  ResponseOptions,
} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class MemoryService implements InMemoryDbService {
  constructor() {}
  createDb() {
    let news = [
      {
        id: 1,
        title: 'News Title 1',
        description: 'News Description',
        summary: 'News Summary',
        full: 'News full',
        image:
          'https://image.shutterstock.com/image-vector/news-background-breaking-newsvector-infographic-260nw-516722350.jpg',
      },
      {
        id: 2,
        title: 'News Title 2',
        description: 'News Description',
        summary: 'News Summary',
        full: 'News full',
        image:
          'https://image.shutterstock.com/image-vector/news-background-breaking-newsvector-infographic-260nw-516722350.jpg',
      },
      {
        id: 3,
        title: 'News Title 3',
        description: 'News Description',
        summary: 'News Summary',
        full: 'News full',
        image:
          'https://image.shutterstock.com/image-vector/news-background-breaking-newsvector-infographic-260nw-516722350.jpg',
      },
    ];
    return { news };
  }

  post(requestInfo: RequestInfo) {
    const collectionName = requestInfo.collectionName;
    if (collectionName === 'news') {
      let data = requestInfo.utils.getJsonBody(requestInfo.req);
      const collection = requestInfo.collection;
      data = JSON.parse(data);

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
}
