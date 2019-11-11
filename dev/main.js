var hexSize = 20;

const Hex = Honeycomb.extendHex({ size: 20, orientation: 'flat' })
const Grid = Honeycomb.defineGrid(Hex)
// get the corners of a hex (they're the same for all hexes created with the same Hex factory)
const corners = Hex().corners()
// an SVG symbol can be reused


const grid1 = Grid.rectangle({ width: 4, height: 4 })


var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
  });

var layer = new Konva.Layer();

var group = new Konva.Group({
    x: 120,
    y: 40
})
 

grid1.forEach(function(hex){
    var drawHex = new Konva.RegularPolygon({
        x: hex.cartesian()["x"],
        y: hex.cartesian()["y"],
        sides: 6,
        radius: 10,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 1
        })
    group.add(drawHex);
})

layer.add(group);
stage.add(layer);