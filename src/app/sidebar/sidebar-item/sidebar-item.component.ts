import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
})
export class SidebarItemComponent {
  constructor(private http: HttpClient) {}

  
  getDataAddToLocalStorage() {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '6201fb2803f86c2b47d6f99727bf3563',
    });
    const options = { headers: headers };
    this.http
      .get('https://v3.football.api-sports.io/leagues?current=true', options)
      .subscribe((resposne) => {
        localStorage.setItem('matches', JSON.stringify(resposne));
      });
  }

  

}
