export default class Vector2 {
  static Unit() {
    return new Vector2(1, 1)
  }

  static Zero() {
    return new Vector2(0, 0)
  }

  static Left() {
    return new Vector2(-1, 0)
  }

  static Right() {
    return new Vector2(1, 0)
  }

  static Up() {
    return new Vector2(0, -1)
  }

  static Down() {
    return new Vector2(0, 1)
  }

  static FromArray(arr: number[]) {
    return new Vector2(arr[0], arr[1])
  }

  static FromObject(obj: any) {
    return new Vector2(obj.x, obj.y)
  }

  static Random(scale = 1) {
    return new Vector2(Math.random() * scale, Math.random() * scale)
  }

  static Clone(vector: Vector2) {
    return new Vector2(vector.x, vector.y)
  }

  static Add(v1: Vector2, v2: Vector2) {
    return new Vector2(v1.x + v2.x, v1.y + v2.y)
  }

  static Sub(v1: Vector2, v2: Vector2) {
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
  }

  static Mag(v: Vector2) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
  }

  /**
   * Calculate the distance between two vectors.
   *
   * @param v1
   * @param v2
   * @returns {number}
   */
  static Distance(v1: Vector2, v2: Vector2) {
    return Math.abs(Vector2.Sub(v1, v2).mag())
  }

  static Mult(v1: Vector2, v2: Vector2) {
    return new Vector2(v1.x * v2.x, v1.y * v2.y)
  }

  static Div(v1: Vector2, v2: Vector2) {
    return new Vector2(v1.x / v2.x, v1.y / v2.y)
  }

  static Scale(v: Vector2, s: number) {
    return new Vector2(v.x * s, v.y * s)
  }

  /**
   * @param v1
   * @param v2
   * @returns {number}
   */
  static Dot(v1: Vector2, v2: Vector2) {
    return v1.x * v2.x + v1.y * v2.y
  }

  /**
   * @param vecA
   * @param vecB
   * @returns {number}
   */
  static AngleBetween(vecA: Vector2, vecB: Vector2) {
    return Math.acos(vecA.dot(vecB) / (vecA.mag() * vecB.mag()))
  }

  public x = 0
  public y = 0

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  clone() {
    return new Vector2(this.x, this.y)
  }

  add(vector: Vector2) {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  sub(vector: Vector2) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  scale(factor: number) {
    this.x *= factor
    this.y *= factor
    return this
  }

  dot(other: Vector2) {
    return this.x * other.x + this.y * other.y
  }

  mult(vector: Vector2) {
    this.x *= vector.x
    this.y *= vector.y
    return this
  }

  div(by: Vector2) {
    this.x /= by.x
    this.y /= by.y
    return this
  }

  normalize() {
    const mag = this.mag()
    const revMag = mag !== 0 ? 1 / this.mag() : 1
    this.x *= revMag
    this.y *= revMag
    return this
  }

  mag() {
    return Math.sqrt(this.magSquare())
  }

  magSquare() {
    const { x, y } = this
    return x * x + y * y
  }

  setMag(length: number) {
    this.normalize()
    this.scale(length)
    return this
  }

  limit(limit: number) {
    const mag = this.mag()
    if (mag > limit) {
      this.setMag(limit)
    }
    return this
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`
  }

  toArray() {
    return [this.x, this.y]
  }

  toObject() {
    return { x: this.x, y: this.y }
  }

  equals(other: Vector2) {
    return this.x === other.x && this.y === other.y
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  rotateBy(angle: number) {
    this.setAngle(this.angle() + angle)
    return this
  }

  setAngle(angle: number) {
    const r = this.mag()
    this.x = r * Math.cos(angle)
    this.y = r * Math.sin(angle)
    return this
  }

  setTo(v: Vector2) {
    this.x = v.x
    this.y = v.y
  }
}
