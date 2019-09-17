// graph type to use
let graph = createSequenceDiagram() //= graph you want to use
// nodes and edges compatible with that graph and eachother you want to use
let simplegraph
if (graph) {
  simplegraph = {
    nodes: graph.getNodePrototypes(),
    edges: graph.getEdgePrototypes()
  }
} else {
  simplegraph = {
    nodes: [
      Node()
      // createCircleNode(20, 'red'),
      // createCircleNode(15, 'blue'),
      // createNoteNode(),
      // createImplicitParameterNode(),
      // createCallNode(),
      // createSmilingFace()
    ],
    edges: [
      Edge()
      // createLineEdge(),
      // createNoteEdge(),
      // createCallEdge(),
      // createCurveLine()
    ]
  }
}
// framwork will call:
// Graph: draw(svgPane), findEdge(point), findNode(point), add(node), connect(edge,startPoint, endPoint), remove(node/edge)
// Edges/Nodes: .clone, .getBounds, translate(dx,dy)
// Edges: connect(startNode,endNode)

// no graph provided will also call:
// Edges/Nodes: contains(point), draw(svgPane)
// Edges: getStart, getEnd

// For properties:
/*
option 1:
  provide a getProps() method that returns a 'property object' for each editable property that follows the following:
  {
      type:HTML5 input type to use for editing('color', 'text' , 'number', or 'checkbox'),
      val:current value of this property,
      setter:method used to update this property,
      name:how to label the input for this property
  }

option 2:
  only properties you wante edited have a method starting with 'set',followed by property name,
  these properties also have a getter 'get',followed by property name
*/
