/**
 * Returns the PointNode
 * @class
 * @constructor
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 */
function createPointNode () {
  let x = 0
  let y = 0
  // function removeNode()
  return {

    /**
 * Get subtype
 * @returns {String} - type
 */
    getSubType: () => {
      return 'PointNode'
    },

    /**
 * Get type
 * @returns {String} - type
 */
    getType: () => {
      return 'NODE'
    },

    /**
 * Move node by dx, dy
 * @param {number} dx - the x-distance
 * @param {number} dy - the y-distance
 */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },

    /**
 * Check whether node contains a point
 * @param {Point} p - the point
 * @returns {boolean} - true if it does
 */
    contains: (p) => {
      const THRESHOLD = 5
      let xs = p.x - x
      xs **= 2
      let ys = p.y - y
      ys **= 2
      return Math.sqrt(xs + ys) < THRESHOLD
    },

    /**
 * Get bound
 * @returns {Object} - the bound
 */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: 0,
        height: 0
      }
    },

    /**
 * Make layout
 * @param {graph} g - the graph
 * @param {SVGpanel} g2 - SVGpanel
 */
    layout: () => {

    },

    /**
 * draw
 * @param {SVGpanel} g2 - SVGpanel
 */
    draw: (g2) => {},

    /**
 * Get getConnectionPoint
 * @param {direction} d - a direction
 * @returns {boolean} - true if it is
 */
    getConnectionPoint: (d) => {
      return {
        x: x,
        y: y
      }
    },

    /**
 * Remove node
 * @param {graph} g - the graph
 * @param {node} e - the node
 */
    removeNode () {

    },

    /**
 * Remove edge
 * @param {graph} g - the graph
 * @param {Edge} e - the edge
 */
    removeEdge () {

    }
  }
}
