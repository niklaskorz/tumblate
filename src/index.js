import {Template} from './template';

export function render(template, data) {
  return new Template(template).render(data);
}
