
/**
 * Returns the sequence diagram
 * @class
 * @constructor
 * @property {array} NODE_PROTOTYPES - node prototype
 * @property {array} EDGE_PROTOTYPES - edge prototype
 * @property {number} CALL_YGAP - a constant representing a gap
 */
function createSequenceDiagram () {
  let NODE_PROTOTYPES = []
  let EDGE_PROTOTYPES = []
  NODE_PROTOTYPES.push(createImplicitParameterNode())
  NODE_PROTOTYPES.push(createCallNode())
  NODE_PROTOTYPES.push(createNoteNode())
  EDGE_PROTOTYPES.push(createCallEdge())
  EDGE_PROTOTYPES.push(createNoteEdge())
  const CALL_YGAP = 20

  let base = createGraph() // super.add super.removeEdge
  function getNodes () {
    return base.getNodes()
  }

  /**
 * find edge
 * @returns {Edge} - the edge
 */
  function getEdges () {
    return base.getEdges()
  }

  /**
 * remove node
 * @param {Node} e - the node
 */
  function removeNode (e) {
    return base.removeNode(e)
  }
  /* function layout (g2) {
    base.layout(g2)
    let topLevelCalls = []
    let objects = []
    let nodes = getNodes()
    for (const n of nodes) {
      if (n.getSubType() === 'CallNode' && n.getParent() === undefined) {
        topLevelCalls.push(n)
      } else if (n.getSubType() === 'ImplicitParameterNode') {
        objects.push(n)
      }
    } */
  /* let edges = getEdges()
      for (const e of edges) {
        if (e.getSubType() === 'CallEdge') {
          let end = e.getEnd()
          if (end.getSubType() === 'CallNode') {
            end.setSignaled(e.isSignal())
          }
        }
      } *//*
      let top=0// = objects[0].getTopRectangle().height
      for (let i = 0; i < objects.length; i++) {
        let n = objects[i]
        n.translate(0, -(n.getBounds().y))
        top = objects[i].getTopRectangle().height//Math.max(top, n.getTopRectangle().height)
      }

      for (let i = 0; i < topLevelCalls.length; i++) {
        let call = topLevelCalls[i]
        call.layout(this, g2)
      }

      for (const n of nodes) {
        if (n.getSubType() === 'CallNode') {
          top = Math.max(top, n.getBounds().y + n.getBounds().height)
        }
      }

      top += CALL_YGAP

      for (let i = 0; i < objects.length; i++) {
        let n = objects[i]
        let b = n.getBounds()

        n.setBounds(b.x, b.y, b.width, top - b.y)
      }
  } */
  return {

    /**
 * get NODE_PROTOTYPES
 * @returns {array} - NODE_PROTOTYPES
 */
    getNodePrototypes: () => {
      return NODE_PROTOTYPES
    },

    /**
 * get EDGE_PROTOTYPES
 * @returns {array} - EDGE_PROTOTYPES
 */
    getEdgePrototypes: () => {
      return EDGE_PROTOTYPES
    },

    /**
 * Add node
 * @param {node} n - a node
 * @param {object} p - a pointNode
 * @returns {boolean} - true if it is
 */
    add: (n, p) => {
      if (n.getSubType() === 'CallNode') {
        const nodes = getNodes().filter(x => x.getSubType() === 'ImplicitParameterNode')
        let inside = false
        for (const n2 of nodes) {
          const b2 = n2.getBounds()
          if (p.x < (b2.x + b2.width) && p.x > b2.x) {
            n.setImplicitParameter(n2)
            base.add(n, p)
            return true
          }
          /* if (n2.getSubType() === 'ImplicitParameterNode' && n2.contains(p)) {
            inside = true
            n.setImplicitParameter(n2)
          }
          if (inside === true) { break } */
        }
        return false
      }
      return base.add(n, p)
    },

    /**
 * Remove edge
 * @param {Edge} e - the edge
 */
    removeEdge (e) {
      base.removeEdge(e)
      if (e.getSubType === 'CallEdge' && e.getEnd().getChildren().length === 0) { removeNode(e.getEnd()) }
    },

    /**
 * draw
 * @param {SVGpanel} g2 - SVGpanel
 */
    draw (g2) {
      this.layout(g2)
      let nodes = getNodes()
      for (const n of nodes) {
        if (n.getSubType() !== 'CallNode') {
          n.draw(g2)
        }
      }
      for (const n of nodes) {
        if (n.getSubType() === 'CallNode') {
          n.draw(g2)
        }
      }
      let edges = getEdges()
      for (const e of edges) {
        e.draw(g2)
      }
    },

    /**
 * Make layout
 * @param {graph} g - the graph
 * @param {SVGpanel} g2 - SVGpanel
 */
    layout (g2) {
      base.layout(g2)
      let topLevelCalls = []
      let objects = []
      let nodes = getNodes()
      for (const n of nodes) {
        if (n.getSubType() === 'CallNode' && n.getParent() === undefined) {
          topLevelCalls.push(n)
        } else if (n.getSubType() === 'ImplicitParameterNode') {
          objects.push(n)
        }
      }
      /* let edges = getEdges()
        for (const e of edges) {
          if (e.getSubType() === 'CallEdge') {
            let end = e.getEnd()
            if (end.getSubType() === 'CallNode') {
              end.setSignaled(e.isSignal())
            }
          }
        } */
      let top = 0// = objects[0].getTopRectangle().height
      for (let i = 0; i < objects.length; i++) {
        let n = objects[i]
        n.translate(0, -(n.getBounds().y))
        top = objects[i].getTopRectangle().height// Math.max(top, n.getTopRectangle().height)
      }

      for (let i = 0; i < topLevelCalls.length; i++) {
        let call = topLevelCalls[i]
        call.layout(this, g2)
      }

      for (const n of nodes) {
        if (n.getSubType() === 'CallNode') {
          top = Math.max(top, n.getBounds().y + n.getBounds().height)
        }
      }

      top += CALL_YGAP

      for (let i = 0; i < objects.length; i++) {
        let n = objects[i]
        let b = n.getBounds()
        n.setBounds(b.x, b.y, b.width, top - b.y)
      }
    },

    /**
 * Connect 2 node
 * @param {Node} p1 - first node
 * @param {Node} p2 - second node
 * @param {Edge} e - edge
 */
    connect: (e, p1, p2) => {
      return base.connect(e, p1, p2)
    },

    /**
 * find node
 * @param {object} p - a pointNode
 * @returns {boolean} - true if it is
 */
    findNode: (p) => {
      return base.findNode(p)
    },

    /**
 * find edge
 * @param {Edge} index - the index
 * @param {graph} g - the graph
 * @param {Node} start - the node
 * @param {Node} end - the node
 * @returns {Edge} - the edge
 */
    findEdge: (p) => {
      return base.findEdge(p)
    },

    /**
 * Add node
 * @param {node} n - a node
 * @param {object} p - a pointNode
 * @returns {boolean} - true if it is
 */
    addNode: (n, p) => {
      return base.addNode(n, p)
    },
    getEdges,
    getNodes,
    removeNode,

    /**
 * Remove node or edge containing a point
 * @param {Object} r - the point
 */
    remove (r) {
      this.removeNode(r)
      this.removeEdge(r)
    }
  }
}
