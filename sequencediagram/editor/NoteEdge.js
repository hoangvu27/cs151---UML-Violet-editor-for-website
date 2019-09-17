
/**
 * Returns the NoteEdge
 * @class
 * @constructor
 * @property {Node} start - start node
 * @property {Node} end - end node
 * @property {String} label - the text
 */
function createNoteEdge () {
  let start
  let end
  let label = ''

  /**
 * connection points
 * @returns {Object} - connection points
 */
  function getConnectionPoints () {
    const startBounds = start.getBounds()
    const endBounds = end.getBounds()
    const d = createDirection(endBounds.cx - startBounds.cx, endBounds.cy - startBounds.cy)
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', start.getConnectionPoint(d).x)
    line.setAttribute('y1', start.getConnectionPoint(d).y)
    line.setAttribute('x2', end.getConnectionPoint(d.turn(180)).x)
    line.setAttribute('y2', end.getConnectionPoint(d.turn(180)).y)
    return line
  }

  /**
 * Distance between 2 points
 * @param {number} point1 - first point
 * @param {number} point2 - second point
 * @returns {number} - Distance between 2 points
 */

  function calcDistance (point1, point2) {
    let xs = point2.x - point1.x
    let ys = point2.y - point1.y
    xs **= 2
    ys **= 2
    return Math.sqrt(xs + ys)
  }

  /**
 * Square of a number
 * @param {number} x - the number
 * @returns {number} - square of a number
 */
  function sqr (x) {
    return x * x
  }

  /**
 * distance given 2 points
 * @param {Object} v - first point
 * @param {Object} w - second point
 * @param {number} v.x - x-coordinate first point
 * @param {number} v.y - y-coordinate first point
 * @param {number} w.x - x-coordinate second point
 * @param {number} w.y - y-coordinate second point
 * @returns {number} - distance given 2 points
 */
  function dist2 (v, w) {
    return sqr(v.x - w.x) + sqr(v.y - w.y)
  }

  /**
 * Square of distance given 2 points to segment
 * @param {Object} v - first point
 * @param {Object} w - second point
 * @param {number} v.x - x-coordinate first point
 * @param {number} v.y - y-coordinate first point
 * @param {number} w.x - x-coordinate second point
 * @param {number} w.y - y-coordinate second point
 * @returns {number} - distance given 2 points
 */
  function sqr (x) {
    return x * x
  }

  /**
 * distance given 2 points
 * @param {Object} v - first point
 * @param {Object} w - second point
 * @param {number} v.x - x-coordinate first point
 * @param {number} v.y - y-coordinate first point
 * @param {number} w.x - x-coordinate second point
 * @param {number} w.y - y-coordinate second point
 * @returns {number} - distance given 2 points
 */
  function dist2 (v, w) {
    return sqr(v.x - w.x) + sqr(v.y - w.y)
  }

  /**
 * Square of distance given 2 points to segment
 * @param {Object} v - first point
 * @param {Object} w - second point
 * @param {number} v.x - x-coordinate first point
 * @param {number} v.y - y-coordinate first point
 * @param {number} w.x - x-coordinate second point
 * @param {number} w.y - y-coordinate second point
 * @returns {number} - distance given 2 points
 */
  function distToSegmentSquared (p, v, w) {
    let l2 = dist2(v, w)
    if (l2 === 0) return dist2(p, v)
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2
    if (t < 0) return dist2(p, v)
    if (t > 1) return dist2(p, w)
    return dist2(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) })
  }

  /**
 * distance given 2 points
 * @param {Object} v - first point
 * @param {Object} w - second point
 * @returns {number} - distance given 2 points
 */
  function distToSeqment (p, v, w) {
    return Math.sqrt(distToSegmentSquared(p, v, w))
  }
  return {

    /**
 * Get type
 * @returns {String} - type
 */
    getType: () => {
      return 'EDGE'
    },

    /**
 * Get subtype
 * @returns {String} - type
 */
    getSubType: () => {
      return 'NoteEdge'
    },

    /**
 * Clone this edge
 * @returns {NoteEdge} - a clone of this edge
 */
    clone: () => {
      return createNoteEdge()
    },

    /**
 * Connect 2 node
 * @param {Node} s - first node
 * @param {Node} e - second node
 */
    connect: (s, e) => {
      start = s
      end = e
    },

    /**
 * Get the start node
 * @returns {Node} - the start node
 */
    getStart: () => { return start },

    /**
 * Get the end node
 * @returns {Node} - the end node
 */
    getEnd: () => { return end },

    /**
 * Get bounds
 * @returns {Object} - an object representing the bound
 */
    getBounds: () => {
      let line2 = getConnectionPoints()
      let x = 0
      let y = 0
      let width = 0
      let height = 0
      let x1 = parseFloat(line2.getAttribute('x1'))
      let x2 = parseFloat(line2.getAttribute('x2'))
      let y1 = parseFloat(line2.getAttribute('y1'))
      let y2 = parseFloat(line2.getAttribute('y2'))
      if (x1 < x2) {
        x = x1
        width = x2 - x1
      } else {
        x = x2
        width = x1 - x2
      }
      if (y1 < y2) {
        y = y1
        height = y2 - y1
      } else {
        y = y2
        height = y1 - y2
      }
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },

    /**
 * Move node by dx, dy
 * @param {number} dx - the x-distance
 * @param {number} dy - the y-distance
 */
    translate (dx, dy) {

    },

    /**
 * draw this edge
 * @param {SVGpanel} panel- SVG panel
 */
    draw: function (panel) {
      // const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')

      const theLine = getConnectionPoints()
      theLine.setAttribute('stroke', 'black')
      theLine.setAttribute('stroke-dasharray', '4')

      /* let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      let b = this.getBounds()
      textElement.setAttribute('x', b.x + b.width / 2)
      textElement.setAttribute('y', b.y)
      textElement.innerHTML = label */

      panel.appendChild(theLine)
      // g.append(theLine)
      // g.appendChild(textElement)
    },

    /**
 * Check whether this edge contains a point
 * @param {Point} p - the point
 * @returns {Boolean} - true if it does, false otherwise
 */
    contains: (p) => {
      const MAX_DIST = 3
      const conn = getConnectionPoints()
      const lineStart = { x: parseFloat(conn.getAttribute('x1')), y: parseFloat(conn.getAttribute('y1')) }
      const lineEnd = { x: parseFloat(conn.getAttribute('x2')), y: parseFloat(conn.getAttribute('y2')) }
      if (calcDistance(p, lineStart) <= MAX_DIST || calcDistance(p, lineEnd) <= MAX_DIST) { return false }
      return distToSeqment(p, lineStart, lineEnd) <= MAX_DIST * 2
    },
    getConnectionPoints,

    /**
 * Get value of middle label
 * @returns {String} value of middle label
 */
    getLabel () { return label },

    /**
 * Set new value for middle label
 * @param {String} l - first point
 */
    setLabel (l) { label = l },

    /**
 * Get properties of this edge
 * @returns {array} properties of this edge
 */
    getProps () { return [] }
  }
}
