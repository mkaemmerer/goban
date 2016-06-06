function equals(item1){
  return function(item2){
    if(item1 && item1.equals){
      return item1.equals(item2);
    }
    return item1 === item2;
  }
}
function contains(array, item){
  return array.findIndex(equals(item)) !== -1;
}

export default class Set {
  constructor(members){
    this._members = members;
    this.length   = members.length;
  }
  toArray(){
    return this._members;
  }

  contains(e){
    return contains(this._members, e);
  }
  union(set){
    return this.disjointUnion(set.subtract(this));
  }
  subtract(set){
    const members = this._members
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
    const members = [];
    this._members.map(f)
      .forEach(e => { if(!contains(members, e)){ members.push(e); }});
    return new Set(members);
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
  static fromJS({_members}){
    return new Set(_members);
  }
}
