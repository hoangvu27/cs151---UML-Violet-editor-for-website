
/**
 * Create SmilingFace
 * @returns {Object} - the object representing SmilingFace
 */
function createSmilingFace () {
  let x = 0
  let y = 0
  let size = 50
  const DefaultColor = 'yellow'
  let color = DefaultColor

  return {
    /**
 * Clone this edge
 * @returns {CallEdge} - a clone of this edge
 */
    clone: () => {
      return createSmilingFace()
    },
    /**
 * Get type of this edge
 * @returns {String} - type of edge
 */
    getSubType: () => {
      return 'SmilingFace'
    },
    /**
 * Get subtype of this edge
 * @returns {String} - subtype of edge
 */
    getType: () => {
      return 'NODE'
    },
    /**
 * draw this edge
 * @param {SVGpanel} g2- SVG panel
 */
    getBounds: () => {
      return { x: x, y: y, width: size, height: size }
    },
    /**
 * Check whether this node contains a point
 * @param {Point} p - the point
 * @returns {Boolean} - true if it does, false otherwise
 */
    contains: (p) => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
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
 * draw
 * @param {SVGpanel} g2 - SVGpanel
 */
    draw: (g2) => {
      const face = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      face.setAttribute('cx', x + size / 2)
      face.setAttribute('cy', y + size / 2)
      face.setAttribute('r', size / 2)
      face.setAttribute('fill', color)
      g2.appendChild(face)

      const leftEye = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
      leftEye.setAttribute('cx', x + 15)
      leftEye.setAttribute('cy', y + 15)
      leftEye.setAttribute('rx', 5)
      leftEye.setAttribute('ry', 10)
      leftEye.setAttribute('fill', 'black')
      g2.appendChild(leftEye)

      const rightEye = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse')
      rightEye.setAttribute('cx', x + 35)
      rightEye.setAttribute('cy', y + 15)
      rightEye.setAttribute('rx', 5)
      rightEye.setAttribute('ry', 10)
      rightEye.setAttribute('fill', 'black')
      g2.appendChild(rightEye)

      const mouth = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      let str = ''
      let x1 = x + 11
      let y1 = y + 32
      let x2 = x + 11
      let y2 = y + 50
      let x3 = x + 39
      let y3 = y + 50
      let x4 = x + 39
      let y4 = y + 32
      str += 'M' + x1 + ' ' + y1 + 'C' + ' ' + x2 + ' ' + y2 + ' ,' + x3 + ' ' + y3 + ' ,' + x4 + ' ' + y4
      mouth.setAttribute('d', str)
      mouth.setAttribute('stroke', 'black')
      mouth.setAttribute('stroke-width', 3)
      g2.appendChild(mouth)
    },
    /**
 * Get getConnectionPoint
 * @param {direction} d - a direction
 * @returns {boolean} - true if it is
 */
	 getConnectionPoint: (other) => {
      let centerX = x + size / 2
      let centerY = y + size / 2
      let dx = other.x - centerX
      let dy = other.y - centerY
      let distance = Math.sqrt(dx * dx + dy * dy)
      if (distance === 0) return other
      else {
        return { x: centerX + dx * (size / 2) / distance, y: centerY + dy * (size / 2) / distance }
      }
    },

    /**
 * Get size
 * @returns {number} - size
 */
    getSize: () => { return size },
    /**
 * Get x
 * @returns {number} - x
 */
    getX: () => { return x },
    /**
 * Get y
 * @returns {number} - y
 */
    getY: () => { return y },
    /**
 * Get color
 * @returns {String} - color
 */
    getColor: () => { return color }
  }
}
