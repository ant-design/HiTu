import { Theme } from './interface';
import { noteOnce } from 'rc-util/lib/warning';

export function replaceTheme(html: string, theme: Theme = {}) {
  let parsedHTML = html;

  Object.keys(theme).forEach(origin => {
    parsedHTML = parsedHTML.replace(new RegExp(origin, 'g'), theme[origin]);

    noteOnce(
      !origin.includes('#'),
      '`theme` with color replacement is an experimental function. Please lock version if you are using this in production.',
    );
  });

  return parsedHTML;
}
