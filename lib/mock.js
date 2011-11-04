var data = require('./data');

var mock = {
  real:false,
  words: data.words.split(","),
  wurds: [],
  names: data.names.split(","),
  letters: data.letters,
  sites: data.sites.split(","),

  toArray: function(thing){
    if (typeof(thing) == "object" && !(!!thing.push || !!thing.item)) {
      var a = [];
      for(var nm in thing){ a.push(thing[nm]); }
      thing = a;
    } else if (typeof(thing) == "string"){
      if (/\./.test(thing)) {
        thing = thing.split(".");
        thing.pop();
        var i = thing.length; while(i--) {
          thing[i] = this.trim(thing[i]) + ".";
        }
      } else if (/,/.test(thing)) {
        thing = thing.split(",");
      } else if (/\s/.test(thing)) {
        thing = thing.split(" ");
      } else {
        thing = thing.split("");
      }
    }
    return thing; //Array
  },

  trim: function(s){ // thanks to Dojo:
    return String.prototype.trim ? s.trim() :
      s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  pad: function(n, amt, chr){
    var c = chr || "0"; amt = amt || 2;
    return (c+c+c+c+c+c+c+c+c+c+n).slice(-amt);
  },

  cap: function(w){
    return w.charAt(0).toUpperCase() + w.substring(1);
  },

  weight: function(n, exp){
    var rev = exp < 0;
    exp = exp===undefined ? 1 : Math.abs(exp)+1;
    var res = Math.pow(n, exp);
    return rev ? 1 - res : res;
  },

  n: function(n, w){
    return Math.floor((n || 10) * this.weight(Math.random(), w));
  },

  range: function(min, max, w){
    max = max || 0;
    return this.n(Math.abs(max-min)+1, w) + (min<max?min:max);
  },

  element: function(thing, w){
    // return slot, char, prop or range
    if(typeof(thing) == "number") return this.n(thing, w);
    thing = this.toArray(thing);
    return thing[this.n(thing.length, w)];
  },

  scramble: function(ary){
    var a = ary.concat([]), sd = [];
    var i = a.length; while(i--){
      sd.push(a.splice(this.n(a.length), 1)[0]);
    }
    return sd;
  },

  bignumber: function(len){
    var t="";
    while(len--){
      t += this.n(9);
    }
    return t;
  },

  date: function(o){
    o = o || {};
    var d1 = new Date(o.min || new Date());
    var d2 = new Date(o.max || new Date().setFullYear(d1.getFullYear()+(o.yearRange||1))).getTime();
    d1 = d1.getTime();
    var d = new Date(this.range(d1,d2,o.weight));
    if(o.seconds){
      return d.getTime();
    }else if(o.delimiter){
      return this.pad(d.getMonth()+1)+o.delimiter+this.pad(d.getDate()+1)+o.delimiter+(d.getFullYear());
    }
    return d;
  },

  bool: function(w){
    return this.n(2, w) < 1;
  },

  color: function(w){
    return "#"+this.pad(this.n(255, w).toString(16))+this.pad(this.n(255, w).toString(16))+this.pad(this.n(255, w).toString(16));
  },

  chars:function(min, max, w){
    var s = "", i = this.range(min, max, w); while(i--){
      s += this.letters[this.n(this.letters.length)];
    }
    return s;
  },

  name: function(cse){
    // cse: 0 title case, 1 lowercase, 2 upper case
    var s = this.names[this.n(this.names.length)];
    return !cse ? s : cse==1 ? s.toLowerCase() : s.toUpperCase();
  },

  site: function(cse){
    // cse: 0 title case, 1 lowercase, 2 upper case
    var s = this.sites[this.n(this.sites.length)];
    return !cse ? s : cse==1 ? s.toLowerCase() : s.toUpperCase();
  },

  url: function(usewww, xt){
    var w = usewww ? "www." : "";
    xt = xt || ".com";
    return "http://" + w + this.site(1) + xt;
  },

  word: function(){
    var w = this.real ? this.words : this.wurds;
    return w[this.n(w.length)];
  },

  sentences: function(minAmt, maxAmt, minLen, maxLen){
    // amt: sentences, len: words
    minAmt = minAmt || 1;
    maxAmt = maxAmt || minAmt;
    minLen = minLen || 5;
    maxLen = maxLen || minLen;
    var t = "";
    var w = this.real ? this.words : this.wurds;
    var i = this.range(minAmt, maxAmt); while(i--){
      var s = [];
      var ii = this.range(minLen, maxLen); while(ii--){
        s.push(w[this.n(w.length)]);
      }
      t += this.cap(s.join(" ")) +". ";
    }
    return t;
  },

  title: function(min, max){
    min = min || 1; max = max || min; var a=[];
    var w = this.real ? this.words : this.wurds;
    var i = this.range(min, max); while(i--){
      a.push(this.cap(w[this.n(w.length)]));
    }
    return a.join(" ");
  },

  image: function(minW, maxW, minH, maxH) {
    var w = this.range(minW, maxW);
    var h = this.range(minH, maxH);
    return "http://dummyimage.com/"+w+"x"+h+"/000/fff";
  }
};
mock.wurds = data.words.replace(/a|e|i|o|u/g, function(c){ return ("aeiou")[mock.n(5)]; }).split(",");

module.exports = mock;
