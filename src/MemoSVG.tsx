import * as React from 'react';

export interface MemoSVGProps {
  component: React.ComponentType;
}

function MemoSVG({ component: Component }: MemoSVGProps) {
  return React.useMemo(() => {
    return <Component />;
  }, [Component]);
}

export default React.memo(MemoSVG);
