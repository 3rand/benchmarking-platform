import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Sequence } from '../shared/models/sequence.model';

@Injectable()
export class SequenceService {

  constructor(private http: HttpClient) { }

  getSequences(): Observable<Sequence[]> {
    return this.http.get<Sequence[]>('/api/sequences');
  }

  countSequences(): Observable<number> {
    return this.http.get<number>('/api/sequences/count');
  }

  addSequence(sequence: Sequence): Observable<Sequence> {
    return this.http.post<Sequence>('/api/sequence', sequence);
  }

  getSequence(sequence: Sequence): Observable<Sequence> {
    return this.http.get<Sequence>(`/api/sequence/${sequence._id}`);
  }

  editSequence(sequence: Sequence): Observable<any> {
    return this.http.put(`/api/sequence/${sequence._id}`, sequence, { responseType: 'text' });
  }

  deleteSequence(sequence: Sequence): Observable<any> {
    return this.http.delete(`/api/sequence/${sequence._id}`, { responseType: 'text' });
  }

}
