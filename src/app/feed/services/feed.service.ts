import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from '@shared/models/post';

import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FeedService {
    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
    }

    addPost(post: Post): Observable<Post> {
        return this.http.post<Post>(`${environment.apiUrl}/posts`, post);
    }

    deletePost(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/posts/${id}`);
    }
}
