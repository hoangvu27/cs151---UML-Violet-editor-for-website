/**
 * Creates direction
 * @class
 *
 * @constructor
 *
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 */
function createDirection (p, q) {
  let x
  let y
  if (typeof p === 'number' && typeof q === 'number') {
    x = p
    y = q
    const length = Math.sqrt(x * x + y * y)
    if (length === 0) return
    x = x / length
    y = y / length
  } else {
    x = q.x - p.x
    y = q.y - p.y
  }
  return {
    /**
    * @memberof createDirection
    * @param {number} angle the degree to turn
    * @return {object} new direction object
    * @description turn direction a given degree
     */
    turn: (angle) => {
      let a = angle * (Math.PI / 180)
      return createDirection(x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a))
    },
    /**
    * @memberof createDirection
    * @return {number} x position in x-axis
     */
    getX: () => { return x },
    /**
    * @memberof createDirection
    * @return {number} y position in y-axis
     */
    getY: () => { return y }
  }
}
