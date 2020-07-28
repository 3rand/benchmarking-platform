import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class DatasetService {

    constructor(private http: HttpClient) {
    }

    getDatasets(): Observable<any[]> {
        return this.http.get<any[]>('/api/datasets');
    }

    getDatasetsCondensed(): Observable<any[]> {
        return this.http.get<any[]>('/api/datasetsCondensed');
    }

    addDataset(dataset: any): Observable<any> {
        return this.http.post<any>('/api/dataset', dataset);
    }

    getDataset(dataset: any): Observable<any> {
        return this.http.get<any>(`/api/dataset/${dataset._id}`);
    }

    editDataset(dataset: any): Observable<any> {
        return this.http.put(`/api/dataset/${dataset._id}`, dataset, {responseType: 'text'});
    }

    deleteDataset(dataset: any): Observable<any> {
        return this.http.delete(`/api/dataset/${dataset._id}`, {responseType: 'text'});
    }

}
