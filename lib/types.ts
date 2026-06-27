export interface ToolOption {
  id: string;
  label: string;
  type: 'select' | 'toggle' | 'number';
  default: string | boolean | number;
  options?: { label: string; value: string }[];
}

export interface ToolExample {
  title: string;
  input: string;
  output: string;
}

export interface ToolFAQ {
  question: string;
  answer: string;
}

export type TransformFn = (
  input: string,
  options?: Record<string, string | boolean | number>
) => { output: string; error?: string };

export interface ToolConfig {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  inputLabel?: string;
  outputLabel?: string;
  inputType?: 'text' | 'code' | 'file';
  outputType?: 'text' | 'code' | 'html' | 'image';
  options?: ToolOption[];
  examples?: ToolExample[];
  faqs?: ToolFAQ[];
  relatedTools?: string[];
  transform: TransformFn;
}

/**
 * Serializable subset of ToolConfig that can cross the Server → Client boundary.
 * The transform function is excluded — Client Components look it up via getTransform(slug).
 */
export type ToolConfigSerializable = Omit<ToolConfig, 'transform'>;
