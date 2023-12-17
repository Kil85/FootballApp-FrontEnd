import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MainPaigeService } from '../main-paige/main-paige.service';

@Component({
  selector: 'app-date-bar',
  templateUrl: './date-bar.component.html',
  styleUrls: ['./date-bar.component.scss'],
  providers: [DatePipe],
})
export class DateBarComponent implements OnInit {
  currentWeek: {
    date: Date;
    formattedDate: string;
    isSelected: boolean;
    absDate: string;
  }[] = [];
  selectedDate: string | null = null;

  constructor(
    private datePipe: DatePipe,
    private mPageService: MainPaigeService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();

    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 7
    );

    while (startDate <= endDate) {
      const formattedDate = this.getFormattedDate(startDate);
      const isSelected = this.isToday(startDate); // Sprawdzamy, czy to jest dzisiejsza data
      const test = startDate.toString();
      this.currentWeek.push({
        date: startDate,
        formattedDate,
        isSelected,
        absDate: test,
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    // Znajdujemy datę dzisiejszą i zaznaczamy ją domyślnie
    const todayIndex = this.currentWeek.findIndex((day) => day.isSelected);
    if (todayIndex !== -1) {
      this.selectDate(this.currentWeek[todayIndex]);
    }
  }
  getFormattedDate(date: Date): string {
    if (this.isToday(date)) {
      return 'Dzisiaj';
    } else {
      const dayOfWeek = this.getDayOfWeek(date);
      const shortDayOfWeek = dayOfWeek.slice(0, 2) + '\n';
      const formattedDate = this.datePipe.transform(date, 'dd.MM');
      return `${shortDayOfWeek} ${formattedDate}`;
    }
  }

  isToday(someDate: Date): boolean {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  }

  getDayOfWeek(date: Date): string {
    const days = [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota',
    ];
    return days[date.getDay()];
  }
  selectDate(selected: {
    date: Date;
    formattedDate: string;
    isSelected: boolean;
    absDate: string;
  }): void {
    this.currentWeek.forEach((day) => (day.isSelected = false));
    selected.isSelected = true;
    this.selectedDate = selected.isSelected ? selected.absDate : null;
    this.mPageService.setCurrentDate(selected.absDate);
    console.log(this.mPageService.fetchFixtures());
  }
}
