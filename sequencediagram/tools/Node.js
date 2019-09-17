/**
 * Creates basic node
 * @class
 *
 * @constructor
 *
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 * @property {string} color position on the y-axis
 * @property {number} size position on the y-axis
 */
function Node () {
  let color = 'blue'
  let size = 25
  let x = 0
  let y = 0
  return {
    /**
    * @memberof Node
    * @return {object} the cloned version of the Node
    * @description get cloned Node
     */
    clone: () => {
      return Node()
    },
    /**
    * @memberof Node
    * @return {object} the bounds of the Node
    * @description gets the bounds of the Node
     */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    /**
    * @memberof Node
    * @param {object} p point object
    * @return {bool} whether the point is in the Node
    * @description checks if a givin point is in the Node
     */
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    /**
    * @memberof Node
    * @param {number} dx amount to move in the x-aixs
    * @param {number} dy amount to move in the y-aixs
    * @description moves NOde
     */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /**
    * @memberof Node
    * @param {} panel the SVG element to draw on
    * @description draws Node
     */
    draw: (panel) => {
      // circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r', size / 2)
      circle.setAttribute('fill', color)
      panel.appendChild(circle)
    },
    /**
    * @memberof Node
    * @param {object} other another node to compare to
    * @return {number} the connection point
    * @description gets the connection point of the Node
     */
    getConnectionPoint: (other) => {
      let centerX = x + size / 2
      let centerY = y + size / 2
      let dx = other.x - centerX
      let dy = other.y - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance === 0) return other
      else {
        return { x: centerX + dx * (size / 2) / distance,
          y: centerY + dy * (size / 2) / distance }
      }
    }
  }
}
