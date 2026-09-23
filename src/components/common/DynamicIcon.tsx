import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  size = 20,
  className = '',
  color
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;

  return <IconComponent size={size} className={className} color={color} />;
};
