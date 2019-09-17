/**
 * Returns the createImplicitParameterNode
 * @class
 * @constructor
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 * @property {array} children - the children of this node
 * @property {String} label - the text
 * @property {number} width -  the width
 * @property {number} height -  the height
 * @property {Node} thisParent - the parent of this node
 * @property {number} topHeight - the topHeight
 */
function createImplicitParameterNode () {
  let topHeight = 60
  let width = 100
  let height = 120
  let x = 0
  let y = 0
  let thisParent
  let children = []
  let label = 'objectName : ClassName'

  /**
 * Add children
 * @param {number} index - the index
 * @param {Node} node - the node
 */
  function addChild (index, node) {
    let oldParent = node.getParent()
    if (oldParent !== undefined) { oldParent.removeChild(node) }
    children[index] = node
    node.makeParent(this)
  }

  /**
 * Add children
 * @param {number} index - the index
 * @param {Node} node - the node
 */
  function removeChild (node) {
    if (node.getParent() !== this) return
    for (let i = 0; i < children.length; i++) {
      if (children[i] === node) {
        children.splice(i, 1)
        i--
      }
    }
    node.makeParent(undefined)
  }

  /**
 * Get top rectangle
 * @returns {Object} - top rectangle
 */
  function getTopRectangle () {
    let x1 = x
    let x2 = x + width
    let y1 = y
    let y2 = y + topHeight
    return {
      x: x,
      y: y,
      cx: x + width / 2,
      cy: y + topHeight / 2,
      width: width,
      height: topHeight,
      contains: (p) => {
        return x1 <= p.x && p.x <= x2 &&
                 y1 <= p.y && p.y <= y2
      }
    }
  }

  return {

    /**
 * Clone this edge
 * @returns {NoteEdge} - a clone of this edge
 */
    clone: () => {
      return createImplicitParameterNode()
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
 * Set bounds
 * @param {number} x2 - new x
 * @param {number} y2 - new y
 * @param {number} width2 - new width
 * @param {number} height2 - new height
 */
    setBounds: (x2, y2, width2, height2) => {
      x = x2
      y = y2
      width = width2
      height = height2
    },
    /**
 * Add node
 * @param {node} n - a node
 * @param {object} p - a pointNode
 * @returns {boolean} - true if it is
 */
    addNode: (n, p) => {
      if (n.getSubType() === 'PointNode' || n.getSubType() === 'CallNode') { return true } else return false
    },
    /**
 * Get getConnectionPoint
 * @param {direction} d - a direction
 * @returns {boolean} - true if it is
 */
    getConnectionPoint: (d) => {
      let x2 = x
      let y2 = y
      if (d.getX() > 0) {
        x2 = x + width
        y2 = y + topHeight / 2
      } else {
        x2 = x
        y2 = y + topHeight / 2
      }
      return {
        x: x2,
        y: y2
      }
    },
    /**
 * Add edge
 * @param {Edge} index - the index
 * @param {Node} p1 - the node
 * @param {Node} p2 - the node
 * @param {boolean} - true if it adds, false otherwise
 */
    addEdge: (e, p1, p2) => {
      return false
    },

    getTopRectangle,
    /**
 * draw
 * @param {SVGpanel} g2 - SVGpanel
 */
    draw: (g2) => {
      // super.draw from AbstractNode. Unneeded?

      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      const top = getTopRectangle()
      const topRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      topRectangle.setAttribute('x', top.x)
      topRectangle.setAttribute('y', top.y)
      topRectangle.setAttribute('width', top.width)
      topRectangle.setAttribute('height', top.height)
      topRectangle.setAttribute('fill', 'white')
      topRectangle.setAttribute('stroke', 'black')
      topRectangle.setAttribute('stroke-width', 1)
      // to add muliple label lines use tspans and dy attribute of the tspane for each line:
      // https://stackoverflow.com/questions/31469134/how-to-display-multiple-lines-of-text-in-svg
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      lbl.setAttribute('x', top.x)
      lbl.setAttribute('y', top.y + top.height / 2)
      lbl.setAttribute('textLength', top.width)
      lbl.setAttribute('lengthAdjust', 'spacingAndGlyphs')
      lbl.setAttribute('font-size', top.width / g2.width)
      lbl.innerHTML = label
      // group and append them
      g2.appendChild(g)
      g.append(topRectangle)
      g.append(lbl)
      const xmid = x + width / 2
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', xmid)
      line.setAttribute('y1', top.y + top.height)
      line.setAttribute('x2', xmid)
      line.setAttribute('y2', y + height)
      line.setAttribute('stroke', 'black')
      line.setAttribute('stroke-dasharray', '4')
      g.appendChild(line)
    },
    /**
 * Check whether node contains a point
 * @param {Point} p - the point
 * @returns {boolean} - true if it does
 */
    contains: (p) => {
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
      /* for (const n of children) {
        n.translate(dx, dy)
      } */
    },
    /**
 * Get subtype
 * @returns {String} - type
 */
    getSubType: () => {
      return 'ImplicitParameterNode'
    },
    /**
 * Get type
 * @returns {String} - type
 */
    getType: () => {
      return 'NODE'
    },

    /**
 * Remove node
 * @param {graph} g - the graph
 * @param {node} e - the node
 */
    removeNode: (g, n) => {

    },

    /**
 * Remove edge
 * @param {graph} g - the graph
 * @param {Edge} e - the edge
 */
    removeEdge: (g, n) => {

    },

    /**
 * Set new value for middle label
 * @param {String} l - first point
 */
    setLabel (l) { label = l },

    /**
 * Get value of middle label
 * @returns {String} value of middle label
 */
    getLabel () { return label },

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
    makeParent: (node) => {
      thisParent = node
    },
    addChild,
    removeChild,

    /**
 * getImplicitParameter
 * @returns {Object} - undefined
 */
    getImplicitParameter: () => {
      return undefined
    },

    /**
 * Make layout
 * @param {graph} g - the graph
 * @param {SVGpanel} g2 - SVGpanel
 */
    layout: (g, g2) => {
      // resize node based on text
    },

    /**
 * Get properties of this edge
 * @returns {array} properties of this edge
 */
    getProps () {
      return [{
        name: 'Label',
        type: 'text',
        setter: (v) => { label = v },
        val: label
      }]
    }
  }
}
