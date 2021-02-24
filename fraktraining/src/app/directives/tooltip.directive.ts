import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { TooltipDirection } from '../core/enums/tooltip-direction.enum';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip')
  tooltipTitle!: string;
  @Input()
  placement!: string;
  @Input() showAlways: boolean = false;
  @Input()
  delay!: string;
  tooltip: HTMLElement | any;

  offset = 10;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  @HostListener('click') onClick() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.tooltip, 'tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.tooltip, 'tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.tooltip);
      this.tooltip = null;
    });
  }

  create() {
    this.tooltip = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.tooltip,
      this.renderer.createText(this.tooltipTitle)
    );

    this.renderer.appendChild(document.body, this.tooltip);

    this.renderer.addClass(this.tooltip, 'tooltip');
    this.renderer.addClass(this.tooltip, `tooltip-${this.placement}`);
  }

  setPosition() {
    const hostPos = this.el.nativeElement.getBoundingClientRect();

    const tooltipPos = this.tooltip?.getBoundingClientRect();

    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === TooltipDirection.Top) {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === TooltipDirection.Bottom) {
      top = hostPos.top + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === TooltipDirection.Left) {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
    }

    if (this.placement === TooltipDirection.Right) {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.tooltip, TooltipDirection.Top, `${top + scrollPos}px`);
    this.renderer.setStyle(this.tooltip, TooltipDirection.Left, `${left}px`);
  }
}
