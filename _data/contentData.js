import { readFileSync } from 'fs';

export default function () {
  const code = readFileSync('./assets/content-data.js', 'utf-8');
  const window = {};
  new Function('window', code)(window);
  return window.CONTENT_DATA;
}
