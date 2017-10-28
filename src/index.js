import { grebElement } from './utils/helpers';

class tefx {

  constructor(selector) {
    this.elements = grebElement(selector);
    this.elementsNodes = {};
    return this;
  }

  cleanText(element) {
    Object.keys(element.nodes).map(function (key, index) {
        // VOLTAR AQUI E PEGAR TEXTO E SALVAR RELATIVO A KEY
    });
    if(node.nodeName === '#text') {
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

  loopChild() {
    let that = this;

    Object.keys(this.elementsNodes).map(function (key, index) {
      that.cleanText(that.elementsNodes[key]);
    });
  }

  parseHtml(element, key) {
    let nodes = element.childNodes;
    let elementChildren = element.children;

    this.elementsNodes[key] = { key, nodes, elementChildren };
    this.loopChild();
  }

  initialSetup() {
    let elements = this.elements;

    Object.keys(elements).map(function (key, index) {
      elements[key].style.opacity = '1';
    });
  }

  start() {
    let elements = this.elements;
    let that = this;

    this.initialSetup();

    Object.keys(elements).map(function (key, index) {
      that.parseHtml(elements[key], key);
    });
  }
};

export default tefx;
