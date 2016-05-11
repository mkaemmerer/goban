import Set   from './set';
import Group from './group';


const X_MIN = 0;
const Y_MIN = 0;
const X_MAX = 9;
const Y_MAX = 9;

class Board {
  constructor(intersections){
    this.intersections = intersections;
  }
  intersectionAt({x,y}){
    return this.intersections[x * X_MAX + y];
  }
  toArray(){
    return this.intersections.map(i => i.contents);
  }

  placeStone(color, location){
    const canonical_location = this.intersectionAt(location).location;
    return this
      ._addStone(color, canonical_location)
      ._removeDeadStones(color, canonical_location);
  }
  _addStone(color, location){
    const stone          = Group.single(color, location);
    const friendly_group = location.neighbors
      .map(l => this.intersectionAt(l).contents)
      .filter(g => g !== null)
      .filter(g => g.color === color)
      .reduce((g1, g2) => g1.merge(g2), stone);

    return this._setLocations(friendly_group.locations, friendly_group);
  }
  _removeDeadStones(color, location){
    const dead_groups = location.neighbors
      .map(l => this.intersectionAt(l).contents)
      .filter(g => g !== null)
      .filter(g => g.color !== color)
      .filter(g => g.liberties(this).length === 0);
    const locations = dead_groups
      .flatMap(g => g.locations);

    return this._setLocations(locations, null);
  }

  _setLocations(locations, contents){
    const intersections = this.intersections.slice(0);
    locations.forEach(location => {
      intersections[location.x * X_MAX + location.y] = {
        location: location,
        contents: contents
      };
    });

    return new Board(intersections);
  }


  static empty(){
    const intersections = [];

    for(let x=0; x<X_MAX; x++){
      for(let y=0; y<Y_MAX; y++){
        intersections[x * X_MAX + y] = {
          location: {x: x, y: y},
          contents: null
        };
      }
    }
    for(let x=0; x<X_MAX; x++){
      for(let y=0; y<Y_MAX; y++){
        const {location} = intersections[x * X_MAX + y];
        const ns         = [];

        if(x > X_MIN)    { ns.push(intersections[(x-1) * X_MAX + (y)  ].location); }
        if(y > Y_MIN)    { ns.push(intersections[(x)   * X_MAX + (y-1)].location); }
        if(x < X_MAX - 1){ ns.push(intersections[(x+1) * X_MAX + (y)  ].location); }
        if(y < Y_MAX - 1){ ns.push(intersections[(x)   * X_MAX + (y+1)].location); }

        location.neighbors = new Set(ns);
      }
    }

    return new Board(intersections);
  }
}

export default Board;
