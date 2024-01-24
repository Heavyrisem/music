import { hexToRgb, rgbToHex, safeRange } from '@/utils/color';

export class Circle {
  private _targetColor: string;

  constructor(
    private _x: number,
    private _y: number,
    private _vx: number,
    private _vy: number,
    private _r: number,
    private _color: string,
    private _xmin: number,
    private _xmax: number,
    private _ymin: number,
    private _ymax: number,
  ) {
    this._targetColor = _color;
  }

  animate(delta: number) {
    let x = this.x + this.vx * delta;
    let y = this.y + this.vy * delta;

    if (x > this.xmax || x < this.xmin) {
      this.vx = this.vx * -1;
    }
    if (y > this.ymax || y < this.ymin) {
      this.vy = this.vy * -1;
    }

    x = this.x + this.vx * delta;
    y = this.y + this.vy * delta;

    x = safeRange(this._xmin, this._xmax, x);
    y = safeRange(this._ymin, this._ymax, y);

    // animate color
    if (this._targetColor !== this._color) {
      const endColor = hexToRgb(this._targetColor);
      const currentColor = hexToRgb(this._color);
      for (let i = 0; i < 3; i++) {
        if (currentColor[i] < endColor[i]) {
          currentColor[i] = safeRange(0, endColor[i], currentColor[i] + delta);
        } else if (currentColor[i] > endColor[i]) {
          currentColor[i] = safeRange(endColor[i], 255, currentColor[i] - delta);
        }
      }
      // console.log(
      //   'from:',
      //   currentColor,
      //   this._color,
      //   'to:',
      //   endColor,
      //   this._targetColor,
      //   'delta:',
      //   delta,
      // );
      this.color = rgbToHex(currentColor);
    }

    this.x = x;
    this.y = y;

    return this;
  }
  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value.toUpperCase();
  }
  public get r(): number {
    return this._r;
  }
  public set r(value: number) {
    this._r = value;
  }
  public get vy(): number {
    return this._vy;
  }
  public set vy(value: number) {
    this._vy = value;
  }
  public get vx(): number {
    return this._vx;
  }
  public set vx(value: number) {
    this._vx = value;
  }
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }
  public get ymax(): number {
    return this._ymax;
  }
  public set ymax(value: number) {
    this._ymax = value;
  }
  public get xmax(): number {
    return this._xmax;
  }
  public set xmax(value: number) {
    this._xmax = value;
  }
  public get ymin(): number {
    return this._ymin;
  }
  public set ymin(value: number) {
    this._ymin = value;
  }
  public get xmin(): number {
    return this._xmin;
  }
  public set xmin(value: number) {
    this._xmin = value;
  }
  public get targetColor(): string {
    return this._targetColor;
  }
  public set targetColor(value: string) {
    this._targetColor = value.toUpperCase();
  }
}
