import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-widget',
  templateUrl: './game-widget.component.html',
  styleUrl: './game-widget.component.scss',
})
export class GameWidgetComponent implements OnInit, OnDestroy {
  dataId: string;
  sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.dataId = params['dataId'] || null;
      console.log(this.dataId);
    });
    // window.document.dispatchEvent(
    //   new Event('DOMContentLoaded', {
    //     bubbles: true,
    //     cancelable: true,
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
