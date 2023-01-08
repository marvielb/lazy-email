import { Field } from './field.model';

export interface Template {
  id: string;
  name: string;
  defaultTo: string;
  defaultCC: string;
  fields: Array<Field>;
  body: string;
}
