// Form types
export interface FormField {
  name: string;
  value: string;
  error: string;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export interface ValidationRule {
  validator: (value: string) => boolean;
  message: string;
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule[];
}

export interface FormConfig {
  fields: string[];
  initialValues: Record<string, string>;
  validationRules: ValidationRules;
}

// Authentication types
export interface User {
  id?: string;
  name: string;
  email: string;
  createdAt?: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  name: string;
  passwordConfirm: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Message types
export type MessageType = 'success' | 'error' | 'info' | 'warning';

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  duration?: number;
}

export interface MessageState {
  messages: Message[];
}

// Component prop types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
export type InputType = 'text' | 'email' | 'password' | 'number' | 'textarea';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export interface InputProps {
  modelValue: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface CardProps {
  hoverable?: boolean;
  shadow?: 'sm' | 'md' | 'lg';
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface MessageAlertProps {
  type: MessageType;
  message: string;
  dismissible?: boolean;
  duration?: number;
}