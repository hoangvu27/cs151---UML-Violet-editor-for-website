function createLineEdge () {
  let start
  let end
  return {
    getType () {
      return 'EDGE'
    },
    getConnectionPoints () {
      const p = end.getConnectionPoint(center(start.getBounds())) // Just pick the center of the bounds for now
      const q = start.getConnectionPoint(center(end.getBounds())) // Not the "connection points" that graphed2 uses
      return { x1: p.x,
        y1: p.y,
        x2: q.x,
        y2: q.y
      }
    },
    contains (aPoint) {
      const cPoints = this.getConnectionPoints()
      const lineLength = Math.sqrt(Math.pow(cPoints.x1 - cPoints.x2, 2) + Math.pow(cPoints.y1 - cPoints.y2, 2))
      const area = Math.abs((cPoints.x1 - cPoints.x2) * (cPoints.y1 - aPoint.y) - (aPoint.x - cPoints.x1) * (cPoints.y2 - aPoint.y)) / 2
      return (area * 2 / lineLength) < 2
    },
    getBounds () {
      const temp = this.getConnectionPoints()
      return { x: Math.min(temp.x1, temp.x2),
        y: Math.min(temp.y1, temp.y2),
        width: Math.abs(temp.x1 - temp.x2),
        height: Math.abs(temp.y1 - temp.y2) }
    },
    connect (s, e) {
      start = s
      end = e
    },
    clone () {
      return createLineEdge()
    },
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
    getStart () { return start },
    getEnd () { return end }
  }
}
