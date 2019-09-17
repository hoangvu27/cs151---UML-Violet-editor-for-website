/**
 * Returns the createCallEdge
 * @class
 * @constructor
 * @property {Node} start - start node
 * @property {Node} end - end node
 * @property {boolean} signal - the signal
 * @property {String} label - the text
 */
function createCallEdge () {
  let start
  let end
  let signal = false
  // let arrowType = 'full'
  // let startLabel
  let middleLabel = 'Message'
  // let endLabel

  /**
 * connection points
 * @returns {Object} - connection points
 */
  function getConnectionPoints () {
    let points = getPoints()

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    line.setAttribute('x1', points[0].x)
    line.setAttribute('y1', points[0].y)
    line.setAttribute('x2', points[points.length - 1].x)
    line.setAttribute('y2', points[points.length - 1].y)
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
  // code from https://jsfiddle.net/beentaken/9k1sf6p2/
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
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / 12
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

  /**
 * the closest point to a path
 * @param {SVGPath} pathNode - the SVG path
 * @param {Object} point -  point
 * @param {number} point.x - x-coordinate first point
 * @param {number} point.y - y-coordinate first point
 * @returns {number} - the closest point
 */
  function closestPoint (pathNode, point) {
    let pathLength = pathNode.getTotalLength()
    let precision = 8
    let best
    let bestLength
    let bestDistance = Infinity

    // linear scan for coarse approximation
    for (let scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
      if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
        best = scan
        bestLength = scanLength
        bestDistance = scanDistance
      }
    }

    // binary search for precise estimate
    precision /= 2
    while (precision > 0.5) {
      let before
      let after
      let beforeLength
      let afterLength
      let beforeDistance
      let afterDistance
      if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
        best = before
        bestLength = beforeLength
        bestDistance = beforeDistance
      } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
        best = after
        bestLength = afterLength
        bestDistance = afterDistance
      } else {
        precision /= 2
      }
    }

    best = [best.x, best.y]
    best.distance = Math.sqrt(bestDistance)
    return best

    /**
 * distance from a point
 * @param {Object} p -  point
 * @param {number} p.x - x-coordinate first point
 * @param {number} p.y - y-coordinate first point
 * @returns {number} - distance from a point
 */
    function distance2 (p) {
      let dx = p.x - point.x

      let dy = p.y - point.y
      return dx * dx + dy * dy
    }
  }

  /**
 * Get the start node
 * @returns {Node} - the start node
 */
  function getStart () { return start }

  /**
 * Get the end node
 * @returns {Node} - the end node
 */
  function getEnd () { return end }

  /**
 * Get the segment path
 * @returns a path
 */
  function getSegmentPath () {
    let points = getPoints()
    let p = points[points.length - 1]
    let subPath = ''
    subPath += 'M' + ' ' + p.x + ' ' + p.y + ' '
    for (let i = points.length - 2; i >= 0; i--) {
      p = points[i]
      subPath += 'L' + ' ' + p.x + ' ' + p.y + ' '
    }
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', subPath)
    path.setAttribute('stroke', 'black')
    path.setAttribute('fill', 'none')
    return path
  }

  /**
 * draw arrow between 2 points
 * @param {Point} p - first point
 * @param {Point} q - second point
 */
  function drawArrow (p, q) {
    const theArrow = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    const ARROW_ANGLE = Math.PI / 6
    const ARROW_LENGTH = 10
    let dx = q.x - p.x
    let dy = q.y - p.y
    let angle = Math.atan2(dy, dx)
    let x1 = q.x - ARROW_LENGTH * Math.cos(angle + ARROW_ANGLE)
    let y1 = q.y - ARROW_LENGTH * Math.sin(angle + ARROW_ANGLE)
    let x2 = q.x - ARROW_LENGTH * Math.cos(angle - ARROW_ANGLE)
    let y2 = q.y - ARROW_LENGTH * Math.sin(angle - ARROW_ANGLE)
    theArrow.setAttribute('d',
      'M' + ' ' + q.x + ' ' + q.y + ' ' +
      'L' + ' ' + x1 + ' ' + y1 + ' ' +
      'M' + ' ' + x2 + ' ' + y2 + ' ' +
      'L' + ' ' + q.x + ' ' + q.y)
    return theArrow
  }

  /**
 * get all points for path
 * @returns {Array} - list of points
 */
  function getPoints () {
    const a = []
    let n = getEnd()
    let start = getStart().getBounds()
    let end = n.getBounds()
    if (n.getSubType() === 'CallNode' && n.getImplicitParameter() === getStart().getImplicitParameter()) {
      let p = {
        x: start.x + start.width,
        y: end.y - n.getYGAP()
      }
      let q = {
        x: end.x + end.width,
        y: end.y
      }
      let s = {
        x: q.x + end.width,
        y: q.y
      }
      let r = {
        x: s.x,
        y: p.y
      }
      a.push(p)
      a.push(r)
      a.push(s)
      a.push(q)
    } else if (n.getSubType() === 'PointNode') {
      let t = {
        x: start.x + start.width,
        y: start.y
      }
      let u = {
        x: end.x,
        y: start.y
      }
      a.push(t)
      a.push(u)
    } else {
      let d = createDirection(start.x - end.x, 0)
      let endPoint = getEnd().getConnectionPoint(d)
      if (start.cx < end.x) {
        a.push({
          x: start.x + start.width,
          y: endPoint.y
        })
      } else {
        a.push({
          x: start.x,
          y: endPoint.y
        })
      }
      a.push(endPoint)
    }
    return a
  }
  /**
 * Get bounds
 * @returns {Object} - an object representing the bound
 */
  function getBounds () {
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
  }

  return {
    /**
 * Get type of this edge
 * @returns {String} - type of edge
 */
    getType: () => {
      return 'EDGE'
    },
    /**
 * Get subtype of this edge
 * @returns {String} - subtype of edge
 */
    getSubType: () => {
      return 'CallEdge'
    },
    /**
 * Clone this edge
 * @returns {CallEdge} - a clone of this edge
 */
    clone: () => {
      return createCallEdge()
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
    getStart,
    getEnd,

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

    getBounds,

    /**
 * draw this edge
 * @param {SVGpanel} g2- SVG panel
 */
    draw: (g2) => {
      // create group
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      g2.appendChild(g)
      // draw arrow
      const theLine = getSegmentPath()
      theLine.setAttribute('stroke', 'black')
      g.appendChild(theLine)
      let points = getPoints()
      const arrow = drawArrow(points[points.length - 2], points[points.length - 1])
      arrow.setAttribute('stroke', 'black')
      g.appendChild(arrow)
      // label(drawn half way between start and end nodes)
      // const s = start.getBounds()
      // const e = end.getBounds()// really should use connection point but im not gonna mess with directions
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const b = getBounds()
      lbl.setAttribute('x', b.x + b.width / 2 - middleLabel.length * 3)
      lbl.setAttribute('y', b.y)// average their y's cause why not
      // lbl.setAttribute('textLength', Math.abs(s.x - e.x))
      // lbl.setAttribute('lengthAdjust', 'spacingAndGlyphs')
      // lbl.setAttribute('font-size', Math.abs(s.x - e.x) / g2.width)
      lbl.innerHTML = middleLabel
      g.append(lbl)
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
      return closestPoint(getSegmentPath(), p).distance <= MAX_DIST * 2
    },

    /**
 * Get signal
 * @returns {Boolean}  - true if signal is on, false otherwise
 */
    isSignal: () => {
      return signal
    },

    /**
 * Set new value for signal
 * @param {Boolean} newValue - the new signal
 */
    setSignal: (newValue) => {
      signal = newValue
      // if (signal === true) { arrowType = 'half' } else arrowType = 'full'
    },
    getConnectionPoints,

    getPoints,
    /* getStartLabel: () => {
      return startLabel
    }, */

    /**
 * Get value of middle label
 * @returns {String} value of middle label
 */
    getMiddleLabel: () => {
      return middleLabel
    },
    /* getEndLabel: () => {
      return endLabel
    }, */
    /* setStartLabel: (newValue) => {
      startLabel = newValue
    }, */

    /**
 * Set new value for middle label
 * @param {String} newValue - first point
 */
    setMiddleLabel: (newValue) => {
      middleLabel = newValue
    },

    /**
 * Move node by dx, dy
 * @param {number} dx - the x-distance
 * @param {number} dy - the y-distance
 */
    translate (dx, dy) {

    }, /*,    setEndLabel: (newValue) => {
      endLabel = newValue
    } */

    /**
 * Get properties of this edge
 * @returns {array} properties of this edge
 */
    getProps () {
      return [{
        name: 'MiddleLabel',
        type: 'text',
        setter: (v) => { middleLabel = v },
        val: middleLabel
      }]
    }
  }
}
