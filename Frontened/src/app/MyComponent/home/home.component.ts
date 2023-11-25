import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs/internal/observable/interval';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  caroselNumber = 0;
  ngOnInit(): void {
    const obs = interval(3500);
    obs.subscribe((d=>{
      this.caroselNumber = (this.caroselNumber+1)%3;
    }));
  }
}
