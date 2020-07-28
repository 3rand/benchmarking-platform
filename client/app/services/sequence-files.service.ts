import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class SequenceFilesService {

  constructor(private http: HttpClient) { }

  getSequenceFiles(): Observable<any[]> {
    return this.http.get<any[]>('/api/sequenceFiles');
  }

  addSequenceFile(seqFile: any): Observable<any> {
    return this.http.post<any>('/api/sequenceFile', seqFile);
  }

  getSequenceFile(seqFile: any): Observable<any> {
    return this.http.get<any>(`/api/sequenceFile/${seqFile._id}`);
  }

  editSequenceFile(seqFile: any): Observable<any> {
    return this.http.put(`/api/sequenceFile/${seqFile._id}`, seqFile, { responseType: 'text' });
  }

  deleteSequenceFile(seqFile: any): Observable<any> {
    return this.http.delete(`/api/sequenceFile/${seqFile._id}`, { responseType: 'text' });
  }
}
