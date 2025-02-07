import { Component, Input } from '@angular/core';
import { IconSrcOptions, IconSrcOptionsMap } from '@pwm/util';

@Component({
  selector: 'pwm-service-icon',
  templateUrl: './service-icon.component.html',
  // styleUrls: ['./service-icon.component.scss'],
})
export class ServiceIconComponent {
  public IconSrcOptions = IconSrcOptions;

  @Input()
  public iconSrc?: IconSrcOptions = IconSrcOptions.default;
  @Input()
  public serviceUrl?: string;

  // public getUrl(url: string): string {
  //   if (url.includes('http://') || url.includes('https://')) {
  //     return url;
  //   }
  //   return `https://${url}`;
  // }

  public getIconSrc(): string | null {
    if (!this.iconSrc || !this.serviceUrl) return null;

    let url: string = IconSrcOptionsMap[this.iconSrc];
    let serviceUrl: string = this.serviceUrl;

    // strip protocol
    let regex: RegExp = /^(?:https?:\/\/)?(?:www\.)?/;
    serviceUrl = serviceUrl.replace(regex, '');

    // strip path
    regex = /\/.*/;
    serviceUrl = serviceUrl.replace(regex, '');

    // Drop in url into api call
    regex = /{{URL}}/gm;
    url = url.replace('{{URL}}', serviceUrl);
    return url;
  }

  public getFontIconSrc(): string | null {
    if (!this.iconSrc || !this.serviceUrl) return null;

    // console.log('===================')
    // let faClass = String(IconSrcOptionsEnum[this.iconSrc]);
    // console.log(this.iconSrc);
    let faClass = IconSrcOptionsMap[this.iconSrc];
    // if(!faClass) return ''
    // console.log(faClass)
    let name = this.serviceUrl;
    // console.log(name)
    //  strip protocol
    let regex = /^(?:https?:\/\/)?(?:www\.)?/;
    name = name.replace(regex, '');
    // console.log(name)
    // Strip end
    regex = /(?:\..*)$/;
    name = name.replace(regex, '');
    // console.log(name)
    faClass = faClass.replace('{{NAME}}', name);
    // console.log(faClass)
    // console.log('===================')
    return faClass;
  }
}
