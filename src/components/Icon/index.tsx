import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/a/font_4121957_9sfbz29ke37.js',
});

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  type: string;
}

const Icon = ({ type, ...props }: IconProps) => <IconFont type={`icon-${type}`} {...props} />;

export default Icon;
