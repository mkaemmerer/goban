import Set from './set';

export default class Group {
  constructor(color, locations){
    this.color     = color;
    this.locations = locations;
  }
  merge(group){
    const locations = this.locations.union(group.locations);
    return new Group(this.color, locations);
  }
  neighbors(){
    return this.locations
      .flatMap(location => location.neighbors())
      .subtract(this.locations);
  }
  liberties(board){
    return this.neighbors()
      .map(l => board.intersectionAt(l))
      .filter(i => i.contents === null)
      .map(i => i.location);
  }
  static single(color, location){
    return new Group(color, Set.single(location));
  }
  static fromJS({color, locations}){
    return new Group(color, locations);
  }
}
