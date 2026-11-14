import { type ReactNode } from 'react';
import { SITE } from '../data/site';
import { GmailComposeForm, type FormField } from './ui/gmail-compose-form';

export type FieldDef = FormField;

export type FormProps = {
  subject: string;
  fields: FieldDef[];
  extra?: Record<string, string>;
  button?: string;
  endpoint?: string;
  note?: ReactNode;
  category?: string;
  layout?: 'split' | 'stacked';
  className?: string;
};

/** A responsive contact form featuring real-time Google Gmail compose synchronization. */
export function Form({
  subject,
  fields,
  extra,
  button = 'Send message',
  endpoint = SITE.formEndpoint,
  note,
  category,
  layout = 'split',
  className = '',
}: FormProps) {
  return (
    <GmailComposeForm
      subject={subject}
      fields={fields}
      extra={extra}
      button={button}
      endpoint={endpoint}
      note={note}
      category={category}
      layout={layout}
      className={className}
    />
  );
}

export default Form;
