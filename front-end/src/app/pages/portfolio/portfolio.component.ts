import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { log } from 'console';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  constructor(private cd: ChangeDetectorRef) {}

  array: number[] = [9, 8, 3, 3, 6, 6, 1];
  sortedArray = [...this.array];
  sortIndex: number | null = null;
  compareIndex: number | null = null;
  swappedIndex: number | null = null;

  onClickSort() {
    this.bubbleSort(this.sortedArray);
  }

  onClickReset() {
    this.sortedArray = [...this.array];
  }

  private async bubbleSort(array: number[]): Promise<number[]> {
    array = [...array];

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        this.sortIndex = j;
        this.compareIndex = j + 1;
        this.swappedIndex = null;
        this.cd.detectChanges();
        await this.sleep(1000);

        if (array[j] > array[j + 1]) {
          const big = array[j];
          const small = array[j + 1];
          array[j] = small;
          array[j + 1] = big;
          this.sortIndex = j + 1;
          this.swappedIndex = j;
          this.compareIndex = null;
          this.cd.detectChanges();
        }
        this.sortedArray = [...array];
        await this.sleep(1000);
      }

      this.sortIndex = null;
      this.compareIndex = null;
      this.swappedIndex = null;
    }

    this.sortIndex = null;

    return array;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }
}
