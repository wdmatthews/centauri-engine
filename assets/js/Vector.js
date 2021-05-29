export default class Vector {
  /** (-1, 0) */
  static left = new Vector(-1, 0)
  /** (1, 0) */
  static right = new Vector(1, 0)
  /** (0, -1) */
  static down = new Vector(0, -1)
  /** (0, 1) */
  static up = new Vector(0, 1)
  /** (0, 0) */
  static zero = new Vector()
  /** (1, 1) */
  static one = new Vector(1, 1)
  
  /**
   * Returns an (x, y) vector.
   * If x or y is not given, they are replaced with a 0.
   * @param {number} x
   * @param {number} y
   * @example new Vector() // (0, 0)
   * @example new Vector (1, 1) // (1, 1)
   */
  constructor(x, y) {
    this.x = x ?? 0
    this.y = y ?? 0
  }
  
  /**
   * Returns a string representation of this vector, in the format: (`x`, `y`)
   * @returns {string} (`x`, `y`)
   * @example vector.toString()
   * @example `${vector}`
   */
  toString() {
    return `(${this.x}, ${this.y})`
  }
  
  /**
   * Returns the squared magnitude of this vector.
   */
  get squaredMagnitude() {
    return this.x * this.x + this.y * this.y
  }
  
  /**
   * Returns the magnitude of this vector.
   */
  get magnitude() {
    return Math.sqrt(this.squaredMagnitude)
  }
  
  /**
   * Returns a unit vector in the same direction as this vector.
   */
  get normalized() {
    const magnitude = this.magnitude
    return new Vector(this.x / magnitude, this.y / magnitude)
  }
  
  /**
   * Returns the angle in degrees between this vector and the positive x axis.
   * Minimum: -180 degrees.
   * Maximum: 180 degrees.
   */
  get angle() {
    return 180 / Math.PI * Math.atan2(this.y, this.x)
  }
  
  /**
   * Sets the x and y coordinates of this vector.
   * @param {number} x
   * @param {number} y
   */
  set(x, y) {
    this.x = x
    this.y = y
  }
  
  /**
   * Returns the determinant with this vector and `otherVector`.
   * @param {Vector} otherVector
   * @returns {number} Determinant with this vector and `otherVector`.
   */
  determinant(otherVector) {
    return this.x * otherVector.y - this.y * otherVector.x
  }
  
  /**
   * Returns the dot product with this vector and `otherVector`.
   * @param {Vector} otherVector
   * @returns {number} Dot product with this vector and `otherVector`.
   */
  dotProduct(otherVector) {
    return this.x * otherVector.x + this.y * otherVector.y
  }
  
  /**
   * Returns the angle in degrees between this vector and `otherVector`.
   * @param {Vector} otherVector
   * @returns {number} Angle in degrees between this vector and `otherVector`.
   */
  angleTo(otherVector) {
    return Math.abs(180 / Math.PI * Math.atan2(this.determinant(otherVector), this.dotProduct(otherVector)))
  }
  
  /**
   * Returns the distance between this vector and `otherVector`.
   * @param {Vector} otherVector
   * @returns {number} Distance between this vector and `otherVector`.
   */
  distanceTo(otherVector) {
    const xDistance = otherVector.x - this.x
    const yDistance = otherVector.y - this.y
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance)
  }
  
  /**
   * Adds `otherVector` to this vector.
   * @param {Vector} otherVector
   */
  add(otherVector) {
    this.x += otherVector.x
    this.y += otherVector.y
  }
  
  /**
   * Returns a new vector equal to `vectorA` + `vectorB`.
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   * @returns {Vector} `vectorA` + `vectorB`
   */
  static addVectors(vectorA, vectorB) {
    return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y)
  }
  
  /**
   * Subtracts `otherVector` from this vector.
   * @param {Vector} otherVector
   */
  subtract(otherVector) {
    this.x -= otherVector.x
    this.y -= otherVector.y
  }
  
  /**
   * Returns a new vector equal to `vectorA` - `vectorB`.
   * @param {Vector} vectorA
   * @param {Vector} vectorB
   * @returns {Vector} `vectorA` - `vectorB`
   */
  static subtractVectors(vectorA, vectorB) {
    return new Vector(vectorA.x - vectorB.x, vectorA.y - vectorB.y)
  }
  
  /**
   * Multiplies this vector by `scalar`.
   * @param {number} scalar
   */
  multiply(scalar) {
    this.x *= scalar
    this.y *= scalar
  }
  
  /**
   * Returns a new vector equal to `scalar` * `vector`.
   * @param {Vector} vector
   * @param {number} scalar
   * @returns {Vector} `scalar` * `vector`
   */
  static multiplyVector(vector, scalar) {
    return new Vector(vector.x * scalar, vector.y * scalar)
  }
  
  /**
   * Divides this vector by `scalar`.
   * @param {number} scalar
   */
  divide(scalar) {
    this.x /= scalar
    this.y /= scalar
  }
  
  /**
   * Returns a new vector equal to `scalar` / `vector`.
   * @param {Vector} vector
   * @param {number} scalar
   * @returns {Vector} `scalar` / `vector`
   */
  static divideVector(vector, scalar) {
    return new Vector(vector.x / scalar, vector.y / scalar)
  }
  
  /**
   * Returns if this vector is equal to `otherVector`.
   * @param {Vector} otherVector
   * @returns {boolean} If this vector is equal to `otherVector`.
   */
  equals(otherVector) {
    return this.x === otherVector.x && this.y === otherVector.y
  }
}
