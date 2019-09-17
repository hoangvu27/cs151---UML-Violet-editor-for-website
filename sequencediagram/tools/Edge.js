/**
 * basic edge class
 * @class
 *
 * @constructor
 *
 * @property {object} start start Node
 * @property {object} end end Node
 */
function Edge () {
  let start
  let end

  /**
  * @memberof Edge
  * @return {object} points of connection
  * @description gets the connection point of the Edge
  */
  function getConnectionPoints () {
    const p = end.getConnectionPoint(center(start.getBounds())) // Just pick the center of the bounds for now
    const q = start.getConnectionPoint(center(end.getBounds())) // Not the "connection points" that graphed2 uses
    return { x1: p.x,
      y1: p.y,
      x2: q.x,
      y2: q.y
    }
  }
  return {
    /**
    * @memberof Edge
    * @param {object} aPoint point object
    * @return {bool} whether the point is in the Edge
    * @description checks if a givin point is in the Edge
     */
    contains (aPoint) {
      const cPoints = getConnectionPoints()
      const lineLength = Math.sqrt(Math.pow(cPoints.x1 - cPoints.x2, 2) + Math.pow(cPoints.y1 - cPoints.y2, 2))
      const area = Math.abs((cPoints.x1 - cPoints.x2) * (cPoints.y1 - aPoint.y) - (aPoint.x - cPoints.x1) * (cPoints.y2 - aPoint.y)) / 2
      return (area * 2 / lineLength) < 2
    },
    /**
    * @memberof Edge
    * @return {object} the bounds of the Edge
    * @description gets the bounds of the Edge
     */
    getBounds () {
      const temp = getConnectionPoints()
      return { x: Math.min(temp.x1, temp.x2),
        y: Math.min(temp.y1, temp.y2),
        width: Math.abs(temp.x1 - temp.x2),
        height: Math.abs(temp.y1 - temp.y2) }
    },
    /**
    * @memberof Edge
    * @param {object} s start Node
    * @param {object} e end NOde
    * @description set start and end of Edge
     */
    connect (s, e) {
      start = s
      end = e
    },
    /**
    * @memberof Edge
    * @return {object} the cloned version of the Edge
    * @description get cloned Edge
     */
    clone () {
      return Edge()
    },
    /**
    * @memberof Edge
    * @param {} panel the SVG element to draw on
    * @description draws Edge
     */
    draw (panel) {
      const p = end.getConnectionPoint(center(start.getBounds())) // Just pick the center of the bounds for now
      const q = start.getConnectionPoint(center(end.getBounds())) // Not the "connection points" that graphed2 uses
      const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      newLine.setAttribute('x1', p.x)
      newLine.setAttribute('y1', p.y)
      newLine.setAttribute('x2', q.x)
      newLine.setAttribute('y2', q.y)
      newLine.setAttribute('stroke', 'black')
      panel.appendChild(newLine)
    },
    /**
    * @memberof Edge
    * @return {object} start Node
     */
    getStart () { return start },
    /**
    * @memberof Edge
    * @return {object} end Node
     */
    getEnd () { return end }
  }
}
