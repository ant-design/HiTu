import * as React from 'react';
import SVGContext from './context';

const DEFINE = 'defs';
const OMIT_SVG_ELEMENTS = ['title', 'desc', 'defs'];

function replaceColor(
  props: React.SVGAttributes<any>,
  theme: Record<string, string>,
): React.SVGAttributes<any> {
  if (!theme) {
    return props;
  }

  let newProps = props;

  if (props.fill) {
    newProps = { ...newProps };
    newProps.fill = theme[props.fill] || props.fill;
  }

  return newProps;
}

export interface SVGProps extends Omit<React.SVGAttributes<any>, 'path'> {
  tagName: string;
  path?: number[];
}

function SVG({
  tagName: Component,
  path,
  ...rest
}: SVGProps): React.ReactElement | null {
  const { chipManger, theme } = React.useContext(SVGContext);
  const chip = chipManger.getChip(path);

  // Only create prop object when chip exist to save perf
  if (chip) {
    const props = {
      // TODO: Handle chip operation
    };
    return <Component {...replaceColor(rest, theme)} {...props} />;
  }

  return <Component {...replaceColor(rest, theme)} />;
}

function toNumber(unit: string): number {
  return Number(unit.replace(/[^\d.]/g, '')) || 0;
}

export interface ParseOption {
  debug?: boolean;
  name?: string;
  width?: number;
  height?: number;
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

function getMatchId(txt: string) {
  const match = txt.match(/#([^)]+)/);
  return match && match[1];
}

SVG.parse = (
  text: string,
  { debug, name, width, height }: ParseOption = {},
): React.ReactElement => {
  const id = name || getUUID();
  function getId(originId: string) {
    return `${id}_${originId}`;
  }

  // Create environments
  const fragment = document.createDocumentFragment();
  const container = document.createElement('div');
  fragment.appendChild(container);
  container.innerHTML = text;

  // Fetch children & defines
  const svg: SVGSVGElement = fragment.querySelector('svg')!;

  let defsEle: SVGDefsElement | null = null;
  const defElements: React.ReactElement[] = [];
  const svgChildren = Array.from(svg.children).filter(node => {
    if (node.tagName === DEFINE) {
      defsEle = node as SVGDefsElement;
    }

    return !OMIT_SVG_ELEMENTS.includes(node.tagName);
  });

  // Convert svg defines
  if (defsEle) {
    Array.from(defsEle!.children).forEach((def, index) => {
      const attrs = getAttributes(def);
      attrs.id = getId(attrs.id);
      defElements.push(<SVG key={index} {...attrs} tagName={def.tagName} />);
    });
  }

  // Dig children
  function dig(children: Element[], parentPath: number[] = []) {
    return children.map((node, index) => {
      const { tagName } = node;
      const attrs = getAttributes(node);

      if (tagName === 'mask') {
        attrs.id = getId(node.id);
      } else if (tagName === 'use') {
        const matchId = getMatchId(attrs.xlinkHref);
        if (matchId) {
          attrs.xlinkHref = attrs.xlinkHref.replace(matchId, getId(matchId));
        }
      }

      if (attrs.mask) {
        const matchId = getMatchId(attrs.mask);
        if (matchId) {
          attrs.mask = attrs.mask.replace(matchId, getId(matchId));
        }
      }

      const myPath = [...parentPath, index];
      return (
        <SVG {...attrs} tagName={tagName} key={index} path={myPath}>
          {dig(Array.from(node.children), myPath)}
        </SVG>
      );
    });
  }

  if (debug) {
    container.className = 'hitu-svg-debug';
    document.body.appendChild(fragment);
    (window as any).HITU_SVG_DEBUG = svg;
  }

  const svgAttrs = getAttributes(svg);
  const svgWidth: number = width || toNumber(svgAttrs.width);
  const svgHeight: number = height || toNumber(svgAttrs.height);

  return (
    <SVG
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      {...svgAttrs}
      width={svgWidth}
      height={svgHeight}
      tagName="svg"
    >
      {[<defs key="defs">{defElements}</defs>, ...dig(svgChildren)]}
    </SVG>
  );
};

export default SVG;

export function getColors(text: string) {
  const colors = text.match(/#[a-fA-F\d]{6}/g) || [];
  return colors;
}
