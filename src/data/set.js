export default class Set {
  constructor(members){
    this._members = members;
    this.length   = members.length;
  }

  contains(e){
    return this._members.indexOf(e) !== -1;
  }
  union(set){
    return this.disjointUnion(set.subtract(this));
  }
  subtract(set){
    const members = this._members.slice(0)
      .filter(e => !set.contains(e));
    return new Set(members);
  }
  disjointUnion(set){
    const members = [].concat(this._members, set._members);
    return new Set(members);
  }

  forEach(f){
    this._members.forEach(f);
  }

  map(f){
    return new Set(this._members.map(f));
  }
  filter(f){
    return new Set(this._members.filter(f));
  }
  flatten(){
    return this._members.reduce((s1, s2) => s1.union(s2), Set.empty());
  }
  flatMap(f){
    return this.map(f).flatten();
  }
  reduce(f,s){
    return this._members.reduce(f,s);
  }

  static single(member){
    return new Set([member]);
  }
  static empty(){
    return new Set([]);
  }
}
