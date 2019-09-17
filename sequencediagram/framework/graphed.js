// Where we will combine everything (equivelant of main)
document.addEventListener('DOMContentLoaded', function () {
  if (!graph) {
    graph = Graph()
  }
  const graphSVG = document.getElementById('graphpanel')
  graphSVG.setAttribute('width', 1200)
  graphSVG.setAttribute('height', 500)

  // create toolbar
  const toolbar = ToolBar()
  let tool
  document.addEventListener('toolChange', () => { tool = toolbar.getTool() })

  /**
 * Gets mouse position
 */
  function mouseLocation (event) {
    const rect = panel.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
  let selected

  /**
 * Redraws the graph's nodes and edges
 */
  function repaint () {
    panel.innerHTML = ''
    graph.draw(graphSVG)
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }
  }

  let dragStartPoint
  let dragStartBounds

  const panel = document.getElementById('graphpanel')

  let keys = true
  // event Listeners
  /**
 * Repaints Graph
 * @listens repaint
 */
  document.addEventListener('repaint', repaint)
  /**
 * enable keys
 * @listens enKB
 */
  document.addEventListener('enKB', () => { keys = true })
  /**
 * disable keys
 * @listens disKB
 */
  document.addEventListener('disKB', () => { keys = false })

  // for adding Edges
  let e
  let startMousePoint
  let newEdge

  /**
 * Perform actions when mouse is clicked down
 *
 * @param {} event
 * @listens mousedown
 */
  panel.addEventListener('mousedown', event => {
    dragStartPoint = mouseLocation(event)
    startMousePoint = mouseLocation(event)
    if (simplegraph.nodes.includes(tool)) { // is a node creation tool
      const n = tool.clone()

      if(graph.add(n, mouseLocation(event)))
        selected=n
    } else if (simplegraph.edges.includes(tool)) { // is an edge creation tool
      selected = undefined
      e = tool.clone()
      newEdge = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      newEdge.setAttribute('x1', startMousePoint.x)
      newEdge.setAttribute('y1', startMousePoint.y)
      newEdge.setAttribute('x2', startMousePoint.x)
      newEdge.setAttribute('y2', startMousePoint.y)
      newEdge.setAttribute('stroke', 'black')
      panel.appendChild(newEdge)
    } else if (tool !== undefined) { // is selection tool(fix this later)
      selected = graph.findNode(startMousePoint)
      if (selected === undefined) {
        selected = graph.findEdge(startMousePoint)
      }
    }

    if (selected !== undefined) {
      repaint()
      showProperties(selected, repaint)
      dragStartBounds = selected.getBounds()
    } else {
      document.getElementById('propEditor').innerHTML = ''
    }
  })

  /**
 * Perform actions when mouse is clicked up
 *
 * @param {} event
 * @listens mouseup
 */
  panel.addEventListener('mouseup', event => {
    dragStartPoint = undefined
    if (e != undefined && simplegraph.edges.includes(tool)) {
      if (graph.connect(e, startMousePoint, mouseLocation(event))) {
        repaint()
      }
      newEdge.parentNode.removeChild(newEdge)
      e = undefined
    }
  })

  /**
 * Performs mousemoves action
 *
 * @param {} event
 * @listens mousemoves
 */
  panel.addEventListener('mousemove', event => {
    const mousePoint = mouseLocation(event)
    if (selected !== undefined && dragStartPoint !== undefined) {
      const bounds = selected.getBounds()
      selected.translate(dragStartBounds.x - bounds.x +
        mousePoint.x - dragStartPoint.x,
      dragStartBounds.y - bounds.y +
        mousePoint.y - dragStartPoint.y)
      repaint()
    }
    if (e != undefined && simplegraph.edges.includes(tool)) {
      newEdge.setAttribute('x2', mousePoint.x)
      newEdge.setAttribute('y2', mousePoint.y)
    }
  })

  /**
 * Performs action a key is pressed
 *
 * @param {} event
 * @listens keydown
 */
  document.addEventListener('keydown', event => {
    if (keys) {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        if (selected !== undefined) {
          graph.remove(selected)
          document.getElementById('propEditor').innerHTML = ''
        }
        selected = undefined
        repaint()
      }
    }
  })
})
