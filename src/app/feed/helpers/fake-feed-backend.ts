import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { Post } from '@shared/models/post';

let posts: Post[] = [
    {
        id: 1,
        content: 'Attention all units, this is a very important post',
        author: {
            id: 2,
            username: 'pesho',
            password: '1234',
            firstName: 'Petur',
            lastName: 'Petrov'
        }
    },
    {
        id: 2,
        content: 'Nothing too much here',
        author: {
            id: 2,
            username: 'pesho',
            password: '1234',
            firstName: 'Petur',
            lastName: 'Petrov'
        }
    }
];

@Injectable()
export class FakeFeedBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());
        function handleRoute() {
            switch (true) {
                case url.endsWith('/posts') && method === 'GET':
                    return getPosts();
                case url.endsWith('/posts') && method === 'POST': {
                    let post = { ...request.body };
                    post.id = posts.length + 1;
                    return addPost(post);
                }
                case url.indexOf('/posts') > -1 && method === 'DELETE': {
                    let id = +url.slice(url.lastIndexOf('/') + 1);
                    return deletePost(id);
                }
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }
        }

        // route functions
        function getPosts() {
            if (!isLoggedIn()) return unauthorized();
            return ok(posts);
        }

        function addPost(post: Post) {
            let currentPosts = posts.slice();
            currentPosts.push(post);
            return ok(post);
        }

        function deletePost(id: Post['id']) {
            posts.filter(post => post.id !== id);
            return ok(id);
        }

        // helper functions
        //@ts-ignore
        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }
        //@ts-ignore
        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export const fakeFeedBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeFeedBackendInterceptor,
    multi: true
};
