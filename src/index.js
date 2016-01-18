import {Template} from './template';

export * from './template';
export * from './parser';

export function render(template, data) {
  return new Template(template).render(data);
}
