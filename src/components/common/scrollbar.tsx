import cn from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/css/OverlayScrollbars.css';

interface ScrollbarProps {
  options?: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Scrollbar({
  options,
  children,
  style,
  className,
  ...props
}: ScrollbarProps) {
  return (
    <OverlayScrollbarsComponent
      options={{
        className: cn('os-theme-thin', className),
        scrollbars: {
          autoHide: 'scroll',
        },
        ...options
      }}
      style={style}
      {...props}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
