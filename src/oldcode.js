const LETTERS = "abcdefghijklmnopqrstuvwxyz#%&^+=-";

function selectorType( selector ) {
  let isClass = /(\.)[\S]+/gi.test( selector );
  let isId    = /(\#)[\S]+/gi.test( selector );
  let isTag   = /(\w)[\S]+/gi.test( selector );

  if(isClass) { return 'class'; }
  if(isId) { return 'id'; }
  if(isTag) { return 'tag'; }
}

class RandomText {

  constructor( element ) {
    this.element = element;
    this.childLength = element.childElementCount;
    this.children = element.children;

    console.log( this.element );
    this.textsNodes = []; 
    this.textsMap = [];

    this.start();
    console.log('THIS Ã‰ ', this);
  }

  randomLetter() {
    return LETTERS.charAt( Math.floor(Math.random() * LETTERS.length) );
  }

  loopFunction(obj, resolve) {
    let self = this;
    
    let text = obj.text;
    let target = obj.parent;

    let letters = target.textContent;
    let letterNumber = letters.length;

    for(let i = 0; i <= letterNumber; i++) {
      letters = text.trim().substring(0, i) + this.randomLetter();
    }

    target.textContent = letters;

    setTimeout(function(){
        if(text.trim().length < letterNumber) {
          target.textContent = text;
          return resolve();
        } else {
          loopFunction.call(self, obj, resolve);
        }
      }, 50);

  }

  randomFreakAction(value) {
    let self = this;

    return new Promise(function(resolve, reject) {
      self.loopFunction(value, resolve);
    });
  }


  loopEffect(times) {
    let self = this;

    let seila = this.textsMap.reduce(function combine(cur, next) {
        return cur.then(function(){
          return self.randomFreakAction(next);
        });
    }, Promise.resolve() ).then(function(){
      
        console.log( self );
      if(self.callback) {
        self.callback();
      }
    });
  }

  cleanText(node) {
    if( node.nodeName === '#text') {
      let obj = {
        text: node.textContent,
        parent: node,
      };
      
      this.textsMap.push( obj );
      node.textContent = '';
    } else {
      let childNodes = node.childNodes;

      return childNodes.length > 0 ? this.loopChild(childNodes) : false;
    }
  }

  loopChild(nodes){
    for(let i = 0; i < nodes.length; i++) {
      this.cleanText( nodes[i] );
    }
  }

  parseHtml( element ) {
    let nodes = element.childNodes;
    let elementChildren = element.children;

    this.loopChild(nodes);
  }

  initialSetup() {

    this.element.style.opacity = '1';
  }

  start() {
    this.initialSetup();
    this.parseHtml( this.element );

    let times = this.textsMap.length;
    let loop = this.loopEffect(times);
  }
}


function separateElements( elements, callback ) {
  if(callback) {
    RandomText.prototype.callback = callback;
  }

  console.log('elements.length', elements.length);
  if( elements.length === undefined) {
    console.log( elements );
    return new RandomText( elements );
  }

  for (let i = elements.length - 1; i >= 0; i--) {
    new RandomText( elements[i] );
  }

}

function grebElement( selector ) {
  let cleanSelector =  selector.replace(/\.|\#/g, '');

  if(selectorType(selector) === 'class') {
    return document.getElementsByClassName(cleanSelector);
  } else if( selectorType(selector) === 'id' ) {
    return document.getElementsById(cleanSelector);
  }

  return document.querySelectorAll(cleanSelector);
}

export default function ( selector, callback ) {
  let element;
  if( typeof(selector) === 'string') {
    element = grebElement( selector );
  } else {
    element = selector;
  }

  console.log('INICIO ', element);
  separateElements(element, callback);
};