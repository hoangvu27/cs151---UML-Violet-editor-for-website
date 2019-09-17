/**
 * Creates the toolbar for the framework
 * @class
 *
 * @constructor
 *
 * @property activeTool the current selected tool
 * @property activeIcon the current selected button element
 */
function ToolBar () {
  const toolbarSVG = document.getElementById('toolbar')

  // Set height and width of toolbar
  toolbarWidth = simplegraph.nodes.length + simplegraph.edges.length + 1
  toolbarSVG.setAttribute('width', 50 * toolbarWidth)
  toolbarSVG.setAttribute('height', 50)

  // Set current active button
  let activeTool
  let activeIcon

  // create toolbar buttons
  let offset = 0
  function createButton (image) {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

    rect.setAttribute('width', '100%')
    rect.setAttribute('height', '100%')
    rect.setAttribute('stroke', 'black')
    rect.setAttribute('fill', 'white')

    icon.appendChild(rect)

    const i = image.clone()
    icon.setAttribute('width', '50')
    icon.setAttribute('height', '50')
    icon.setAttribute('x', 50 * offset++)
    let margin = 0

    if (simplegraph.edges.includes(image)) {
      let p = createPointNode()
      p.translate(50, 25)
      let q = createPointNode()
      q.translate(0, 25)
      i.connect(q, p)
    } else {
      i.translate(5, 5)
      margin += 10
    }

    i.draw(icon)
    let bounds = i.getBounds()
    let maxSize = Math.max(bounds.height, bounds.width) + margin
    icon.setAttribute('viewBox', `0 0 ${maxSize} ${maxSize}`)

    icon.addEventListener('click', () => {
      if (rect.getAttribute('fill') === 'white') {
        if (activeIcon !== undefined) {
          activeIcon.childNodes[0].setAttribute('fill', 'white')
        }
        rect.setAttribute('fill', 'grey')
        activeTool = image
        activeIcon = icon
        document.dispatchEvent(toolChange)
      } else {
        rect.setAttribute('fill', 'white')
        activeTool = undefined
        activeIcon = undefined
      }
    })

    toolbarSVG.appendChild(icon)
  }

  // Add select button
  createButton(selectIcon())

  // Add nodes to the toolbar
  simplegraph.nodes.forEach((node) => {
    createButton(node)
  })

  // Add edges to the toolbar
  simplegraph.edges.forEach((edge) => {
    createButton(edge)
  })

  return {
    /**
    * @memberof ToolBar
    * @returns {object} the active tool selected
    * @description  returns the currently select tool from the toolbar
     */
    getTool () { return activeTool }
  }
}
