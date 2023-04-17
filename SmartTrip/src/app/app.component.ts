import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {
    console.log(environment.value);
  }

  async ngOnInit(): Promise<void> {
    const locations = await firstValueFrom(
      this.http.get(`${environment.serverRoot}/locations`)
    );
    console.log(locations);
  }

}
