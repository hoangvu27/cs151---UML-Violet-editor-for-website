/**
 * createCircleNode
 * @returns {Object} - the object representing createCircleNode
 */
function createCircleNode (s, c) {
  let size = s
  let color = c
  let x = 0
  let y = 0
  let notBlue = false
  let label = 'circle'
  return {
    getType: () => {
      return 'NODE'
    },
    clone: () => {
      return createCircleNode(size, color)
    },
    /**
 * draw this edge
 * @param {SVGpanel} g2- SVG panel
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
 * Check whether this node contains a point
 * @param {Point} p - the point
 * @returns {Boolean} - true if it does, false otherwise
 */
    contains: p => {
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
    draw: (panel) => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      // circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r', size / 2)
      if (notBlue) { circle.setAttribute('fill', 'blue') } else { circle.setAttribute('fill', color) }
      // text
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      lbl.setAttribute('x', x)
      lbl.setAttribute('y', y + size / 2)
      lbl.setAttribute('textLength', size)
      lbl.setAttribute('lengthAdjust', 'spacingAndGlyphs')
      lbl.setAttribute('font-size', size / panel.width)
      lbl.innerHTML = label
      // group and append them
      panel.appendChild(g)
      g.append(circle)
      g.appendChild(lbl)
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
        return { x: centerX + dx * (size / 2) / distance,
          y: centerY + dy * (size / 2) / distance }
      }
    },
    /**
 * Set color
 * @param {String} c - color
 */
    setColor: c => { color = c },
    /**
 * Get color
 * @returns {String} - color
 */
    getColor: () => { return color },
    /**
 * Set size
 * @returns {number} - size
 */
    setSize: s => { size = s },
    /**
 * Get size
 * @returns {number} - size
 */
    getSize: () => { return size },
    /**
 * Check whether it is default color
 * @returns {boolean} - true if it is not default color
 */
    getUseDefaultColor () { return notBlue },
    /**
 * Set default color
 * @param {boolean} b - default color
 */
    setUseDefaultColor (b) { notBlue = b },

    /**
 * Get value of middle label
 * @returns {String} value of middle label
 */
    getLabel () { return label },
    /**
 * Set new value for middle label
 * @param {String} l - first point
 */
    setLabel (l) { label = l }
  }
}
