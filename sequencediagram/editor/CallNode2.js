/**
 * Returns the createCallNode
 * @class
 * @constructor
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 * @property {array} children - the children of this node
 * @property {String} label - the text
 * @property {number} width -  the width
 * @property {number} height -  the height
 * @property {number} CALL_YGAP - a constant representing a gap
 * @property {boolean} signal - the signal
 * @property {boolean} openBottom - the openBottom
 */
function createCallNode () {
  let x = 0
  let y = 0
  let width = 16
  let height = 30
  let thisParent
  let children = []
  const CALL_YGAP = 20
  let implicitParameter
  let signaled = false
  let openBottom = false

  /**
 * Move node by dx, dy
 * @param {number} dx - the x-distance
 * @param {number} dy - the y-distance
 */
  function translate (dx, dy) {
    x += dx
    y += dy
  }

  /**
 * Get children
 * @returns {Array} - the children of this node
 */
  function getChildren () {
    return children
  }

  /**
 * Add children
 * @param {number} index - the index
 * @param {Node} node - the node
 */
  /* function addChild (index, node) {
    let oldParent = node.getParent()
    if (oldParent !== undefined) { oldParent.removeChild(node) }
    children[index] = node
    node.makeParent(this)
  } */

  /**
 * Set new bound
 * @param {number} x2 - new x
 * @param {number} y2 - new y
 * @param {number} width2 - new width
 * @param {number} height2 - new height
 */
  function setBounds (x2, y2, width2, height2) {
    x = x2
    y = y2
    width = width2
    height = height2
  }

  /**
 * remove children
 * @param {Node} node - the node
 */
  /* function removeChild (node) {
    if (node.getParent() !== this) return
    for (let i = 0; i < children.length; i++) {
      if (children[i] === node) {
        children.splice(i, 1)
        i--
      }
    }
    node.makeParent(undefined)
  } */
  /* function addChild2 (node) {
    children.push(node)
  } */

  /**
 * Add edge
 * @param {Edge} index - the index
 * @param {Node} p1 - the node
 * @param {Node} p2 - the node
 * @param {boolean} - true if it adds, false otherwise
 */
  /* function addEdge (e, p1, p2) {
    let end = e.getEnd()
    if (end === undefined) return false
    if (e.getSubType() !== 'CallEdge') return false
    let n
    if (e.getSubType() === 'CallEdge') {
      let parent = this
      while (parent !== undefined && end !== parent) { parent = parent.getParent() }
      if (end.getParent() === undefined && end !== parent) {
        n = end
      } else {
        const c = createCallNode()
        c.setImplicitParameter(end.getImplicitParameter())
        e.connect(this, c)
        n = c
      }
    } else if (end.getSubType() === 'ImplicitParameterNode') {
      if (end.getTopRectangle().contains(p2)) {
        n = end
        e.setMiddleLabel('<<create>>')
      } else {
        const c = createCallNode()
        c.setImplicitParameter(end)
        e.connect(this, c)
        n = c
      }
    } else return false
    let i = 0
    while (i < children.length && children[i].getBounds().y <= p1.y) { i++ }
    addChild(i, n)
    return true
  } */

  /**
 * Remove edge
 * @param {graph} g - the graph
 * @param {Edge} e - the edge
 */
  /* function removeEdge (g, e) {
    if (e.getStart === this) { removeChild(e.getEnd()) }
  } */

  /**
 * Remove node
 * @param {graph} g - the graph
 * @param {node} e - the node
 */
  /* function removeNode (g, n) {
    if (n === getParent() || n === implicitParameter) { g.removeNode(this) }
  } */

  /**
 * find edge
 * @param {Edge} index - the index
 * @param {graph} g - the graph
 * @param {Node} start - the node
 * @param {Node} end - the node
 * @returns {Edge} - the edge
 */
  function findEdge (g, start, end) {
    let edges = g.getEdges()
    for (const e of edges) {
      if (e.getStart() === start && e.getEnd() === end) return e
    }
    return undefined
  }

  /**
 * Get bound
 * @returns {Object} - the bound
 */
  function getBounds () {
    return {
      x: x,
      y: y,
      width: width,
      height: height,
      cx: x + width / 2,
      cy: y + height / 2
    }
  }

  /**
 * get parent
 * @returns {Parent} - the parent
 */
  function getParent () {
    return thisParent
  }

  /**
 * make parent
 * @param {Node} node - the node
 */
  function makeParent (node) {
    thisParent = node
  }

  /**
 * Make layout
 * @param {graph} g - the graph
 * @param {SVGpanel} g2 - SVGpanel
 */
  /* function layout (g, g2) {
    if (implicitParameter === undefined) return
    let xmid = implicitParameter.getBounds().cx
    for (let c = getParent(); c !== undefined; c = c.getParent()) {
      if (c.getImplicitParameter() === implicitParameter) { xmid += getBounds().width / 2 }
    }

      translate(xmid - getBounds().cx, 0)
      let ytop = getBounds().y + CALL_YGAP

      let calls = getChildren()
      for (let i = 0; i < calls.length; i++) {
        let n = calls[i]
        if (n.getSubType() === 'ImplicitParameterNode') {
          n.translate(0, ytop - n.getTopRectangle().cy)
          ytop += n.getTopRectangle().height / 2 + CALL_YGAP
        } else if (n.getSubType() === 'CallNode') {
          let callEdge = findEdge(g, this, n)
          if (callEdge !== undefined) {
            let edgeBounds = callEdge.getBounds()
            ytop += edgeBounds.height - CALL_YGAP
          }

          n.translate(0, ytop - n.getBounds().y)
          n.layout(g, g2)
          if (n.getSignaled()) {
            ytop += CALL_YGAP
          } else {
            ytop += n.getBounds().height + CALL_YGAP
          }
        }
      }

      if (openBottom === true) ytop += 2 * CALL_YGAP
      let b = getBounds()
      let minHeight = 30
      let returnEdge = findEdge(g, this, getParent())
      if (returnEdge !== undefined) {
        let edgeBounds = returnEdge.getBounds()
        minHeight = Math.max(minHeight, edgeBounds.height)
      }
      setBounds(b.x, b.y, b.width, Math.max(minHeight, ytop - b.y))
  } */

  /**
 * get signal
 * @returns {boolean} - true if signal is on
 */
  function getSignaled () {
    return signaled
  }
  return {
    /**
 * clone this node
 * @returns {Node} a clone of this node
 */
    clone: () => {
      return createCallNode()
    },

    /**
 * Set oppen Bottom
 * @param {boolean} newValue - a new value
 */
    setOpenBottom: (newValue) => {
      openBottom = newValue
    },

    /**
 * Get oppen Bottom
 * @returns {boolean} - true if it is
 */
    getOpenBottom: () => {
      return openBottom
    },

    /**
 * Set signal
 * @param {boolean} newValue - a new value
 */
    setSignaled: (newValue) => {
      signaled = newValue
    },

    /**
 * Get signal
 * @returns {boolean} - true if it is
 */
    getSignaled,

    /**
 * Add node
 * @param {node} n - a node
 * @param {object} p - a pointNode
 * @returns {boolean} - true if it is
 */
    addNode: (n, p) => {
      return n.getSubType() === 'PointNode'
    },

    /**
 * Get subtype
 * @returns {String} - subtype
 */
    getSubType: () => {
      return 'CallNode'
    },

    /**
 * Get type
 * @returns {String} - type
 */
    getType: () => {
      return 'NODE'
    },

    /**
 * Set Implicitparameter
 * @param {boolean} newValue - a new value
 */
    setImplicitParameter: (newValue) => {
      implicitParameter = newValue
    },

    /**
 * Get Implicitparameter
 * @returns {boolean} - true if it is
 */
    getImplicitParameter: () => {
      return implicitParameter
    },
    getChildren,

    /**
 * Get getConnectionPoint
 * @param {direction} d - a direction
 * @returns {boolean} - true if it is
 */
    getConnectionPoint: (d) => {
      let x2
      let y2 = y
      if (d.getX() > 0) {
        x2 = x + width
      } else {
        x2 = x
      }
      return {
        x: x2,
        y: y2
      }
    },
    getParent,
    makeParent,

    /**
 * Add edge
 * @param {Edge} index - the index
 * @param {Node} p1 - the node
 * @param {Node} p2 - the node
 * @param {boolean} - true if it adds, false otherwise
 */
    addEdge (e, p1, p2) {
      let end = e.getEnd()
      if (end === undefined) return false
      if (e.getSubType() !== 'CallEdge') return false
      let n
      if (end.getSubType() === 'CallNode') {
        let parent = this
        while (parent !== undefined && end !== parent) { parent = parent.getParent() }
        if (end.getParent() === undefined && end !== parent) {
          n = end
        } else {
          const c = createCallNode()
          c.setImplicitParameter(end.getImplicitParameter())
          e.connect(this, c)
          n = c
        }
      } else if (end.getSubType() === 'ImplicitParameterNode') {
        if (end.getTopRectangle().contains(p2)) {
          n = end
          e.setMiddleLabel('create')
        } else {
          const c = createCallNode()
          c.setImplicitParameter(end)
          e.connect(this, c)
          n = c
        }
      } else return false
      let i = 0
      while (i < children.length && children[i].getBounds().y <= p1.y) { i++ }
      this.addChild(i, n)
      return true
    },

    /**
 * Remove edge
 * @param {graph} g - the graph
 * @param {Edge} e - the edge
 */
    removeEdge (g, e) {
      if (e.getStart === this) { this.removeChild(e.getEnd()) }
    },
    findEdge,

    /**
 * Add children
 * @param {number} index - the index
 * @param {Node} node - the node
 */
    addChild (index, node) {
      let oldParent = node.getParent()
      if (oldParent !== undefined) { oldParent.removeChild(node) }
      children[index] = node
      node.makeParent(this)
    },

    /**
 * remove children
 * @param {Node} node - the node
 */
    removeChild (node) {
      if (node.getParent() !== this) return
      for (let i = 0; i < children.length; i++) {
        if (children[i] === node) {
          children.splice(i, 1)
          i--
        }
      }
      node.makeParent(undefined)
    },

    /**
 * Remove node
 * @param {graph} g - the graph
 * @param {node} e - the node
 */
    removeNode (g, n) {
      if (n === getParent() || n === implicitParameter) { g.removeNode(this) }
    },
    getBounds,

    /**
 * draw
 * @param {SVGpanel} g2 - SVGpanel
 */
    draw: (g2) => {
      if (openBottom === true) {
        /* const b = getBounds()
        let x1 = b.x
        let x2 = x1 + b.width
        let y1 = b.y
        let y3 = y1 + b.height
        let y2 = y3 - CALL_YGAP */
      } else {
        const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        rectangle.setAttribute('x', x)
        rectangle.setAttribute('y', y)
        rectangle.setAttribute('width', width)
        rectangle.setAttribute('height', height)
        rectangle.setAttribute('fill', 'white')
        rectangle.setAttribute('stroke', 'black')
        rectangle.setAttribute('stroke-width', 1)
        g2.appendChild(rectangle)
      }
    },
    translate,

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
 * Get gap
 * @returns {Edge} - the gap
 */
    getYGAP: () => {
      return CALL_YGAP
    },

    /**
 * set parent
 * @param {Node} node - the node
 */
    /* setParent: (node) => {
      thisParent = node
    }, */

    /**
 * Make layout
 * @param {graph} g - the graph
 * @param {SVGpanel} g2 - SVGpanel
 */
    layout (g, g2) {
      if (implicitParameter === undefined) return
      let xmid = implicitParameter.getBounds().cx
      for (let c = getParent(); c !== undefined; c = c.getParent()) {
        if (c.getImplicitParameter() === implicitParameter) { xmid += getBounds().width / 2 }
      }

      translate(xmid - getBounds().cx, 0)
      let ytop = getBounds().y + CALL_YGAP

      let calls = getChildren()
      for (let i = 0; i < calls.length; i++) {
        let n = calls[i]

        if (n.getSubType() === 'ImplicitParameterNode') {
          n.translate(0, ytop - n.getTopRectangle().cy)
          ytop += n.getTopRectangle().height / 2 + CALL_YGAP
        } else if (n.getSubType() === 'CallNode') {
          let callEdge = findEdge(g, this, n)
          if (callEdge !== undefined) {
            let edgeBounds = callEdge.getBounds()
            ytop += edgeBounds.height - CALL_YGAP
          }

          n.translate(0, ytop - n.getBounds().y)
          n.layout(g, g2)
          if (n.getSignaled()) {
            ytop += CALL_YGAP
          } else {
            ytop += n.getBounds().height + CALL_YGAP
          }
        }
      }

      if (openBottom === true) ytop += 2 * CALL_YGAP
      let b = getBounds()
      let minHeight = 30
      let returnEdge = findEdge(g, this, getParent())
      if (returnEdge !== undefined) {
        let edgeBounds = returnEdge.getBounds()
        minHeight = Math.max(minHeight, edgeBounds.height)
      }
      setBounds(b.x, b.y, b.width, Math.max(minHeight, ytop - b.y))
    },
    setBounds,

    /**
 * Get properties of this edge
 * @returns {array} properties of this edge
 */
    getProps () { return [] }
  }
}
