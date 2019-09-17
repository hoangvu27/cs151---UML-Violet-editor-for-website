function createCurveLine () {
  let start
  let end
  let panel
  let bound
  return {
    getType () {
      return 'EDGE'
    },

    getSubType: () => {
      return 'CurveLine'
    },

    draw: function (g2) {
      panel = g2
      let points = this.getConnectionPoints()
	  if (points === undefined) return undefined
      let x1 = points.x1
      let y1 = points.y1
      let x2 = points.x2
      let y2 = points.y2

      let x3 = (x1 + x2 + Math.sqrt(3) * (y1 - y2)) / 2
	  let y3 = (y1 + y2 + Math.sqrt(3) * (x2 - x1)) / 2
      // note that point 3 is between point 1 and point 2
      // here, there are be two y3 depending on whether area is positive or negative. Nevertheless, just need to find 1 point

      const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      curve.setAttribute('d', 'M' + x1 + ' ' + y1 + ' ' +
              'Q' + ' ' + x3 + ' ' + y3 + ' ' +
              x2 + ' ' + y2)
      curve.setAttribute('stroke', 'black')
	  curve.setAttribute('fill', 'transparent')
      curve.setAttribute('stroke-width', 10)
      g2.appendChild(curve)
    },

    contains (aPoint) {
      var p = document.getElementsByTagName('svg')[0].createSVGPoint()
   		p.x = aPoint.x
   		p.y = aPoint.y

      let points = this.getConnectionPoints()
	  if (points === undefined) return undefined
      let x1 = points.x1
      let y1 = points.y1
      let x2 = points.x2
      let y2 = points.y2

      let x3 = (x1 + x2 + Math.sqrt(3) * (y1 - y2)) / 2
	  let y3 = (y1 + y2 + Math.sqrt(3) * (x2 - x1)) / 2
      // note that point 3 is between point 1 and point 2
      // here, there are be two y3 depending on whether area is positive or negative. Nevertheless, just need to find 1 point

      const curve = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      curve.setAttribute('d', 'M' + x1 + ' ' + y1 + ' ' +
              'Q' + ' ' + x3 + ' ' + y3 + ' ' +
              x2 + ' ' + y2)
      curve.setAttribute('stroke', 'black')
	  curve.setAttribute('fill', 'transparent')
      curve.setAttribute('stroke-width', 10)
      panel.appendChild(curve)

	  bound	= curve.getBBox()
	  return curve.isPointInStroke(p)
    },

    connect (s, e) {
      start = s
      end = e
    },

    clone () {
      return createCurveLine()
    },

    getBounds: function () {
      const temp = this.getConnectionPoints()
      return { x: Math.min(temp.x1, temp.x2),
        y: Math.min(temp.y1, temp.y2),
        width: Math.abs(temp.x1 - temp.x2),
        height: Math.abs(temp.y1 - temp.y2) }
      // return bound
    },

    getConnectionPoints: () => {
      let startBounds = start.getBounds()
      let endBounds = end.getBounds()
      let startCenter = { x: startBounds.x + startBounds.width / 2, y: startBounds.y + startBounds.height / 2 }
      let endCenter = { x: endBounds.x + endBounds.width / 2, y: endBounds.y + endBounds.height / 2 }
      // const toEnd = Direction(startCenter, endCenter)
      let firstConnectPoint = start.getConnectionPoint(endCenter)
      let secondConnectPoint = end.getConnectionPoint(startCenter)
      return { x1: firstConnectPoint.x,
        y1: firstConnectPoint.y,
        x2: secondConnectPoint.x,
        y2: secondConnectPoint.y }
    },

    getStart () { return start },
    getEnd () { return end }
  }
}
