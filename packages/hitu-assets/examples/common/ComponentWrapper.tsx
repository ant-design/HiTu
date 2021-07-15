import { CSSProperties, FC } from 'react';

const WRAPPER_STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  width: 250,
  overflow: 'hidden',
};

const NAME_STYLE: CSSProperties = {
  display: 'inline-block',
  // antd font family
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans- serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  fontSize: 12
};

type ComponentWrapperProps = {
  name: string;
};

const ComponentWrapper: FC<ComponentWrapperProps> = ({
  children,
  name
}) => (
  <div style={WRAPPER_STYLE}>
    {children}
    <span style={NAME_STYLE}>
      {name}
    </span>
  </div>
);

export default ComponentWrapper;