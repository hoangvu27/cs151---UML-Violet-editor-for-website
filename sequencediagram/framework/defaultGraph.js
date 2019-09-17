/**
 * Creates graph
 * @class
 *
 * @constructor
 *
 * @property {array} nodes list of nodes
 * @property {array} edges list of edges
 */
function Graph () { // returns new generic edge objects
  const edges = []
  const nodes = []

  return {
    /**
    * @memberof Graph
    * @param {object} n Node
    * @param {object} p point object
    * @returns {boolean} whether the add was successful
    * @description add Node
    */
    add (n, p) {
      const b = n.getBounds()
      n.translate(p.x - b.width / 2, p.y - b.height / 2)
      nodes.push(n)
      return true
    },
    /**
    * @memberof Graph
    * @param {object} n Node or Edge
    * @description removes Node or Edge
    */
    remove (n) { // remove a node or edge
      for (let i = edges.length - 1; i >= 0; i--) {
        if (edges[i] === n) {
          edges.splice(i, 1)
          return
        }
        if (edges[i].getStart() === n || edges[i].getEnd() === n) {
          edges.splice(i, 1)
        }
      }
      for (let i = nodes.length - 1; i >= 0; i--) { // no real need to run decremnting loop since only removing one item
        if (nodes[i] === n) {
          nodes.splice(i, 1)
          return
        }
      }
    },

    /**
    * @memberof Graph
    * @param {object} p point object
    * @return {object} node at given point
    * @description finds Node
  */
    findNode (p) { // requires Node: contains
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].contains(p)) {
          return nodes[i]
        }
      }
    },

    /**
    * @memberof Graph
    * @param {object} p point object
    * @return {object} edge at given point
    * @description finds edge
    */
    findEdge (p) {
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].contains(p)) {
          return edges[i]
        }
      }
    },

    /**
    * @memberof Graph
    * @param {object} edge Edge
    * @param {object} p1 start Node
    * @param {object} p2 end Node
    * @returns {boolean} whether the connection is successful
    * @description set start and end of Edge
    */
    connect (edge, p1, p2) {
      const s = this.findNode(p1)
      const e = this.findNode(p2)
      for (const ed of edges) { // don't add edge if exists already?
        if (ed.getStart() === s && ed.getEnd() === e) { // order matters
          return false
        }
      }
      if (s && e) {
        edge.connect(s, e)
        edges.push(edge)
        return true
      }
      return false
    },
    /**
    * @memberof Graph
    * @param {} graphSVG the SVG element to draw on
    * @description draws Nodes and Edges
     */
    draw (graphSVG) {
      for (const n of nodes) {
        /* n.getBounds()
        if(){

        } */
        n.draw(document.getElementById('graphpanel'))
      }
      for (const e of edges) {
        e.draw(document.getElementById('graphpanel'))
      }
    }
  }
}
