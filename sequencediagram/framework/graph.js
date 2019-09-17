/**
 * Creates graph
 * @class
 *
 * @constructor
 *
 * @property {array} nodes list of nodes
 * @property {array} edges list of edges
 * @property {array} nodesToBeRemoved list of nodes to be removed
 * @property {array} edgesToBeRemoved list of edges to be removed
 * @property {boolean} needsLayout true if layout is needed
 */
function createGraph () {
  let nodes = []
  let edges = []
  // let minBounds
  let needsLayout = true
  let nodesToBeRemoved = []
  let edgesToBeRemoved = []

  /**
    * @memberof createGraph
    * @param {object} p point object
    * @return {object} node at given point
    * @description finds Node
  */
  function findNode (p) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      let n = nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }

  /**
    * @memberof createGraph
    * @param {object} p point object
    * @return {object} edge at given point
    * @description finds edge
  */
  function findEdge (p) {
    for (let i = edges.length - 1; i >= 0; i--) {
      let e = edges[i]
      if (e.contains(p)) return e
    }
    return undefined
  }
  /* function layout (g2) {
    if (!needsLayout) return
    nodes = nodes.filter((el) => !nodesToBeRemoved.includes(el))
    edges = edges.filter((el) => !edgesToBeRemoved.includes(el))
    nodesToBeRemoved = []
    edgesToBeRemoved = []

    for (let i = 0; i < nodes.length; i++) {
      let n = nodes[i]
      n.layout(this, g2)
    }
  } */

  /**
    * @memberof createGraph
    * @param {object} n Node
    * @description removes Node
  */
  function removeNode (n) {
    if (nodesToBeRemoved.includes(n)) return
    nodesToBeRemoved.push(n)
    for (const n2 of nodes) {
      n2.removeNode(this, n)
    }
    for (const e of edges) {
      if (e.getStart() === n || e.getEnd() === n) { removeEdge(e) }
    }
    needsLayout = true
  }

  /**
    * @memberof createGraph
    * @param {object} e Edge
    * @description removes Edge
  */
  function removeEdge (e) {
    if (edgesToBeRemoved.includes(e)) return
    edgesToBeRemoved.push(e)
    for (let i = nodes.length - 1; i >= 0; i--) {
      let n = nodes[i]
      n.removeEdge(this, e)
    }
    needsLayout = true
  }
  return {
    /**
    * @memberof createGraph
    * @param {object} e Edge
    * @param {object} s start Node
    * @param {object} e end Node
    * @returns {boolean} whether the connection is successful
    * @description set start and end of Edge
    */
    connect: (e, p1, p2) => {
      let n1 = findNode(p1)
      let n2 = findNode(p2)
      if (n1 !== undefined) {
        e.connect(n1, n2)
        if (n1.addEdge(e, p1, p2) && e.getEnd() !== undefined) {
          edges.push(e)
          if (!nodes.includes(e.getEnd())) { nodes.push(e.getEnd()) }
          needsLayout = true
          return true
        }
      }
      return false
    },

    /**
    * @memberof createGraph
    * @param {object} n Node
    * @param {object} p point object
    * @returns {boolean} whether the add was successful
    * @description add Node
    */
    add: (n, p) => {
      let bounds = n.getBounds()
      n.translate(p.x - bounds.x, p.y - bounds.y)
      let accepted = false
      let insideANode = false
      for (let i = nodes.length - 1; i >= 0 && !accepted; i--) {
        let parent = nodes[i]
        if (parent.contains(p)) {
          insideANode = true
          if (parent.addNode(n, p)) accepted = true
        }
      }
      if (insideANode && !accepted) { return false }
      nodes.push(n)
      needsLayout = true
      return true
    },
    findNode,
    findEdge,

    /**
    * @memberof createGraph
    * @param {} g2 the SVG element to draw on
    * @description draws Node
     */
    draw: (g2) => {
      layout(g2)
      for (const n of nodes) {
        n.draw(g2)
      }
      for (const e of edges) {
        e.draw(g2)
      }
    },
    removeNode,
    removeEdge,
    /**
    * @memberof createGraph
    * @description sets needsLayout to true
     */
    doLayout: () => {
      needsLayout = true
    },
    /**
    * @memberof createGraph
    * @param {} g2 the SVG element to draw on
    * @description add g2 to the layout
     */
    layout (g2) {
      if (!needsLayout) return
      nodes = nodes.filter((el) => !nodesToBeRemoved.includes(el))
      edges = edges.filter((el) => !edgesToBeRemoved.includes(el))
      nodesToBeRemoved = []
      edgesToBeRemoved = []

      for (let i = 0; i < nodes.length; i++) {
        let n = nodes[i]
        n.layout(this, g2)
      }
    },
    /**
    * @memberof createGraph
    * @returns {array} list of nodes
    */
    getNodes () {
      return nodes
    },
    /**
    * @memberof createGraph
    * @returns {array} list of edges
    */
    getEdges () {
      return edges
    },
    /**
    * @memberof createGraph
    * @param {object} n Node
    * @param {object} p point object
    * @returns {boolean} whether the add was successful
    * @description add Node
    */
    addNode: (n, p) => {
      let bounds = n.getBounds()
      n.translate(p.x - bounds.x, p.y - bounds.y)
      nodes.push(n)
    }
  }
}
