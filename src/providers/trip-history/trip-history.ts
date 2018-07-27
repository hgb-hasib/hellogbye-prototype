import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../../models/trip'
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class TripHistoryProvider {
  dataUrl = '../../assets/data/trip-history.json'

  // constructor(public http: HttpClient) {
  // }

  // /** GET trip history */
  // getTripHistory(): Observable<Trip[]> {
  //   return this.http.get<Trip[]>(this.dataUrl);
  // }

  constructor(private db: AngularFireDatabase) { }

  getTrips(batch, lastKey?) {
    return this.db.list('/movies',
      ref => (lastKey) ? ref.startAt(lastKey).limitToFirst(batch).orderByKey() : ref.limitToFirst(batch).orderByKey());
  }
}

