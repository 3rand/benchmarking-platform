import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class ToolsService {

    constructor(private http: HttpClient) {
    }

    getTools(): Observable<any[]> {
        return this.http.get<any[]>('/api/tools');
    }

}
