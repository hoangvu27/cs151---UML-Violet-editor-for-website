
/**
 * Returns the createNoteNode
 * @class
 * @constructor
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 * @property {String} label - the text
 * @property {number} width -  the width
 * @property {number} height -  the height
 * @property {String} color - the color
 * @property {Node} thisParent - the parent of this node
 */
function createNoteNode () {
  let x = 0
  let y = 0
  let width = 60
  let height = 40
  let color = 'Yellow'
  let label = 'Note'
  let thisParent

  /**
 * Add edge
 * @param {Edge} index - the index
 * @param {Node} p1 - the node
 * @param {Node} p2 - the node
 * @param {boolean} - true if it adds, false otherwise
 */
  function addEdge (e, p1, p2) {
    const end = createPointNode()
    end.translate(p2.x, p2.y)
    e.connect(this, end)
    return e.getEnd() !== undefined
  }

  /**
 * Remove edge
 * @param {graph} g - the graph
 * @param {Edge} e - the edge
 */
  function removeEdge (g, e) {
    if (e.getStart === this) { g.removeNode(e.getEnd()) }
  }
  return {

    /**
 * Get type
 * @returns {String} - type
 */
    getType: () => {
      return 'NODE'
    },

    /**
 * Get subtype
 * @returns {String} - type
 */
    getSubType: () => {
      return 'NoteNode'
    },

    /**
 * Get bounds
 * @returns {Object} - an object representing the bound
 */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width,
        height: height,
        cx: x + width / 2,
        cy: y + height / 2
      }
    },

    /**
 * Check whether this edge contains a point
 * @param {Point} p - the point
 * @returns {Boolean} - true if it does, false otherwise
 */
    contains: p => {
      return x <= p.x && p.x <= x + width &&
             y <= p.y && p.y <= y + height
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
 * draw this edge
 * @param {SVGpanel} panel- SVG panel
 */
    draw: (panel) => {
      if (label.length > 5) {
        width = label.length * 7
      }
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rectangle.setAttribute('x', x)
      rectangle.setAttribute('y', y)
      rectangle.setAttribute('width', width)
      rectangle.setAttribute('height', height)
      rectangle.setAttribute('fill', color)
      rectangle.setAttribute('stroke', 'black')
      rectangle.setAttribute('stroke-width', 1)

      let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      textElement.setAttribute('x', x + 5)
      textElement.setAttribute('y', y + height / 2)
      textElement.innerHTML = label

      panel.appendChild(g)
      g.append(rectangle)
      g.appendChild(textElement)
    },

    /**
 * Clone this edge
 * @returns {NoteEdge} - a clone of this edge
 */
    clone: () => {
      return createNoteNode()
    },

    /**
 * connection points
 * @returns {Object} - connection points
 */
    getConnectionPoint: (d) => {
      if (d.getX() > 0) {
        if (d.getY() > 0) {
          return {
            x: x,
            y: y
          }
        } else {
          return {
            x: x,
            y: y + height
          }
        }
      } else {
        if (d.getY() > 0) {
          return {
            x: x + width,
            y: y
          }
        } else {
          return {
            x: x + width,
            y: y + height
          }
        }
      }
      /* const slope = height / width
      const ex = d.getX()
      const ey = d.getY()
      let x2 = x + width / 2
      let y2 = y + height / 2
      if (ex !== 0 && -slope <= ey / ex && ey / ex <= slope) {
        if (ex > 0) {
          x2 = x + width
          y2 += (width / 2) * ey / ex
        } else {
          x2 = x
          y2 -= (width / 2) * ey / ex
        }
      } else if (ey !== 0) {
        if (ey > 0) {
          x2 += (height / 2) * ex / ey
          y2 = y + height
        } else {
          x2 -= height / 2 * ex / ey
          y2 = y
        }
      } */
    },
    addEdge,
    removeEdge,

    /**
 * Add node
 * @param {node} n - a node
 * @param {object} p - a pointNode
 * @returns {boolean} - true if it is
 */
    addNode: (n, p) => {
      return false
    },

    /**
 * Remove node
 * @param {graph} g - the graph
 * @param {node} e - the node
 */
    removeNode: (g, n) => {

    },

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
 * Get parent for this NoteNode
 * @returns {Node} - parent
 */
    getParent: () => {
      return thisParent
    },

    /**
 * Set parent for this NoteNode
 * @param {Node} node - parent
 */
    setParent: (node) => {
      thisParent = node
    },

    /**
 * Make layout
 * @param {graph} g - the graph
 * @param {SVGpanel} g2 - SVGpanel
 */
    layout (g, g2) {
      // update bounds based on text
    },

    /**
 * Get properties of this edge
 * @returns {array} properties of this edge
 */
    getProps () {
      return [{
        name: 'Text',
        type: 'text',
        setter: (v) => { label = v },
        val: label
      },
      {
        name: 'Color',
        type: 'color',
        setter: (v) => { color = v },
        val: color
      }]
    }
  }
}
