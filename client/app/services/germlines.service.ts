import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class GermlinesService {

    constructor(private http: HttpClient) {
    }

    getGermlines(): Observable<any[]> {
        return this.http.get<any[]>('/api/germlines');
    }

    addGermline(germline: any): Observable<any> {
        return this.http.post<any>('/api/germline', germline);
    }

    getGermline(germline: any): Observable<any> {
        return this.http.get<any>(`/api/germline/${germline._id}`);
    }

    editGermline(germline: any): Observable<any> {
        return this.http.put(`/api/germline/${germline._id}`, germline, {responseType: 'text'});
    }

    deleteGermline(germline: any): Observable<any> {
        return this.http.delete(`/api/germline/${germline._id}`, {responseType: 'text'});
    }

}
