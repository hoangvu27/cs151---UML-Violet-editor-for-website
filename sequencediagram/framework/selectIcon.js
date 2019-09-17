/**
 * Creates the select icon
 * @class
 *
 * @constructor
 *
 * @property {number} x position on the x-axis
 * @property {number} y position on the y-axis
 */
function selectIcon () {
  let x = 0
  let y = 0
  return {
    /**
    * @memberof selectIcon
    * @param {number} dx amount to move in the x-aixs
    * @param {number} dy amount to move in the y-aixs
    * @description moves icon
     */
    translate: (dx, dy) => {
      x = dx
      y = dy
    },
    /**
    * @memberof selectIcon
    * @return {object} the bounds of the icon
    * @description gets the bounds of the icon
     */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: 25,
        height: 25
      }
    },
    /**
    * @memberof selectIcon
    * @return {object} the cloned version of the icon
    * @description get cloned icon
     */
    clone: () => {
      let si = selectIcon()
      si.translate(x, y)
      return si
    },
    /**
    * @memberof selectIcon
    * @param {} panel the SVG element to draw on
    * @description draws icon
     */
    draw: (panel) => {
      var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      newLine.setAttribute('id', 'line2')
      newLine.setAttribute('x1', 12.5)
      newLine.setAttribute('y1', 3)
      newLine.setAttribute('x2', 12.5)
      newLine.setAttribute('y2', 22)
      newLine.setAttribute('stroke', 'black')
      var newLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      newLine2.setAttribute('id', 'line3')
      newLine2.setAttribute('x1', 3)
      newLine2.setAttribute('y1', 12.5)
      newLine2.setAttribute('x2', 22)
      newLine2.setAttribute('y2', 12.5)
      newLine2.setAttribute('stroke', 'black')
      panel.appendChild(newLine)
      panel.appendChild(newLine2)
    }
  }
}
