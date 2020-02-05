import * as React from 'react';

const DEFINE = 'defs';
const OMIT_SVG_ELEMENTS = ['title', 'desc', 'defs'];

export interface SVGProps extends React.SVGAttributes<any> {
  tagName: string;
}

function SVG({
  tagName: Component,
  ...rest
}: SVGProps): React.ReactElement | null {
  return <Component {...rest} />;
}

export interface ParseOption {
  debug?: boolean;
  name?: string;
}

let uuid = 0;
function getUUID() {
  const rnd = `${Math.random().toFixed(10)}`.replace('.', '');
  const id = `HITU_${rnd}_${uuid}`;
  uuid += 1;
  return id;
}

function camelCase(str: String) {
  let out = '';
  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    if (char === '-' || char === ':') {
      i += 1;
      const next = str[i];
      out += next.toUpperCase();
    } else {
      out += char;
    }
  }
  return out;
}

function getAttributes(dom: Element): any {
  const { attributes } = dom;
  const attrs: Record<string, string> = {};
  for (let i = 0; i < attributes.length; i += 1) {
    const attr = attributes[i];
    const name = camelCase(attr.name);
    attrs[name] = attr.value;
  }
  return attrs;
}

SVG.parse = (
  text: string,
  { debug, name }: ParseOption = {},
): React.ReactElement => {
  const id = name || getUUID();

  // Create environments
  const fragment = document.createDocumentFragment();
  const container = document.createElement('div');
  fragment.appendChild(container);
  container.innerHTML = text;

  // Fetch children & defines
  const svg: SVGSVGElement = fragment.querySelector('svg')!;

  let defsEle: SVGDefsElement | null = null;
  const svgChildren = Array.from(svg.children).filter(node => {
    if (node.tagName === DEFINE) {
      defsEle = node as SVGDefsElement;
    }

    return !OMIT_SVG_ELEMENTS.includes(node.tagName);
  });

  // Convert svg defines
  const defs = new Set();
  if (defsEle) {
    Array.from(defsEle!.children).forEach(def => {
      defs.add(def.id);
      def.id = `${id}_${def.id}`;
    });
  }

  if (debug) {
    console.warn(svgChildren, defs);
    container.className = 'hitu-svg-debug';
    document.body.appendChild(fragment);
    (window as any).HITU_SVG_DEBUG = svg;
  }

  return <SVG {...getAttributes(svg)} tagName="svg" />;
};

export default SVG;
