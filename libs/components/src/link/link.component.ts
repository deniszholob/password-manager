import { Component, Input } from '@angular/core';
import { HyperLink } from './link.model';

@Component({
  selector: 'pwm-link',
  templateUrl: './link.component.html',
  styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
})
export class LinkComponent {
  // TODO: Make required when using latest angular version
  @Input()
  public link?: HyperLink;
}
