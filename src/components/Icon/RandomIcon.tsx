
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const RandomSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="12" height="12" x="2" y="10" rx="2" ry="2"></rect>
    <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6"></path>
    <path d="M6 18h.01"></path>
    <path d="M10 14h.01"></path>
    <path d="M15 6h.01"></path>
    <path d="M18 9h.01"></path>
  </svg>
);

export const RandomIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={RandomSvg} {...props} />
);