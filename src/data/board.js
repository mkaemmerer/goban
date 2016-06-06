import Set   from './set';
import Group from './group';


const X_MIN = 0;
const Y_MIN = 0;
const X_MAX = 9;
const Y_MAX = 9;

class Location {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  neighbors(){
    const {x, y} = this;
    const ns     = [];

    if(x > X_MIN)    { ns.push( new Location(x-1, y  )); }
    if(y > Y_MIN)    { ns.push( new Location(x  , y-1)); }
    if(x < X_MAX - 1){ ns.push( new Location(x+1, y  )); }
    if(y < Y_MAX - 1){ ns.push( new Location(x  , y+1)); }

    return new Set(ns);
  }
  equals(location){
    return this.x === location.x && this.y === location.y;
  }
  static fromJS({x,y}){
    return new Location(x,y);
  }
}

class Board {
  constructor(intersections){
    this.intersections = intersections;
  }
  intersectionAt({x,y}){
    return this.intersections[x * X_MAX + y];
  }
  groups(){
    return new Set(this.intersections)
      .filter(i => i.contents !== null)
      .map(i => i.contents);
  }

  placeStone(color, location){
    const canonical_location = this.intersectionAt(location).location;
    return this
      ._addStone(color, canonical_location)
      ._removeDeadStones(color, canonical_location);
  }
  _addStone(color, location){
    const stone          = Group.single(color, location);
    const friendly_group = location.neighbors()
      .map(l => this.intersectionAt(l).contents)
      .filter(g => g !== null)
      .filter(g => g.color === color)
      .reduce((g1, g2) => g1.merge(g2), stone);

    return this._setLocations(friendly_group.locations, friendly_group);
  }
  _removeDeadStones(color, location){
    const dead_groups = location.neighbors()
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
          location: new Location(x,y),
          contents: null
        };
      }
    }

    return new Board(intersections);
  }
  static fromJS({intersections}){
    return intersections
      .filter(i => i.contents !== null)
      .reduce((b,i) => {
        const {color, locations} = i.contents;
        const group = Group.fromJS({
          color:     color,
          locations: Set.fromJS(locations).map(l => Location.fromJS(l))
        });
        return b._setLocations(group.locations, group);
      }, Board.empty());
  }
}

export default Board;
