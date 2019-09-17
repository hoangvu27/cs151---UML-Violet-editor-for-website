// helper functions
/**
* @param {number} x
* @param {number} y
* @description draws grabber
*/
function drawGrabber (x, y) {
  const size = 5

  const panel = document.getElementById('graphpanel')
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', x - size / 2)
  rect.setAttribute('y', y - size / 2)
  rect.setAttribute('width', size)
  rect.setAttribute('height', size)
  rect.setAttribute('fill', 'black')
  panel.appendChild(rect)
}

/**
* @param {} rect
* @return {number} the center of the rect
* @description fidn the center of a rectangle
*/
function center (rect) {
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
}
