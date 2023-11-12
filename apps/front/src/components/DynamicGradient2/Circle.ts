export class Circle {
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
    console.log(_xmax, _ymax);
  }

  animate(delta: number) {
    let x = this.x + this.vx * delta;
    let y = this.y + this.vy * delta;

    if (x > this.xmax || x < this.xmin) {
      this.vx = this.vx * -1;
      x = this.x + this.vx * delta;
    }
    if (y > this.ymax || y < this.ymin) {
      this.vy = this.vy * -1;
      y = this.y + this.vy * delta;
    }

    this.x = x;
    this.y = y;

    return this;
  }

  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
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
}
