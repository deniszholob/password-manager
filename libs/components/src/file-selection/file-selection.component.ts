import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FILE_ACCEPT_DATA, slash, DataService } from '@pwm/util';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'pwm-file-selection',
  templateUrl: './file-selection.component.html',
  // styleUrls: ['./file-selection.component.scss'],
})
export class FileSelectionComponent {
  @Input()
  public disabled = false;

  @Output()
  public buttonClick = new EventEmitter<void>();

  public FILE_ACCEPT = FILE_ACCEPT_DATA;
  public error: string | null = null;
  public loading: string | null = null;

  constructor(private dataService: DataService) {}

  // TODO: Copied from landing page, reuse somehow?
  private initReadData(location: string, file?: File) {
    // console.log(`initReadData() - `, location, file);
    this.loading = 'Reading Data...';
    this.error = null;

    this.dataService
      .readData(location, file)
      .pipe(
        catchError((err) => {
          // console.error(`  initReadData() readData() catchError - `, err);
          if (err instanceof SyntaxError) {
            this.error = `  Error reading file, please try again or start a new one.`;
          } else {
            this.error = err;
          }
          return of(null);
        })
      )
      .subscribe(
        (res) => {
          // console.log('  File Read Done')
          this.loading = null;
          this.buttonClick.emit();
        },
        (err) => {
          // console.error(`  initReadData() readData() fail - `, err);
          this.loading = null;
          this.error = err;
        }
      );
  }

  // ======================================================================== //
  // ============================= Template ================================= //

  public newDataFile() {
    // console.log(`newDataFile()`);
    this.loading = 'Creating New Data File...';
    this.error = null;

    this.dataService.createDataFile().subscribe(
      (res) => {
        // console.log(`  Sub createDataFile: `, res);
        this.loading = null;
        this.buttonClick.emit();
      },
      (err) => {
        // console.error(`  newDataFile() createDataFile() fail - `, err);
        this.loading = null;
        this.error = err;
      }
    );
  }

  public openDataFile(file: File | null) {
    // console.log(`openDataFile() - `, file);
    if (file) {
      // If dialog was closed/canceled file is null, so do nothing
      this.initReadData(file.path ? slash(file.path) : file.name, file);
    }
  }
}
