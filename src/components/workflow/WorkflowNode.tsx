import React from 'react';
import { cn } from '@/lib/utils';

interface WorkflowNodeProps {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  position: { x: number; y: number };
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  onClick?: (id: string) => void;
  className?: string;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  id,
  title,
  description,
  icon,
  position,
  size = 'md',
  isActive = false,
  onClick,
  className
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 md:w-16 md:h-16 text-[10px] md:text-xs',
    md: 'w-16 h-16 md:w-24 md:h-24 text-xs md:text-sm',
    lg: 'w-20 h-20 md:w-32 md:h-32 text-sm md:text-base'
  };

  return (
    <div
      className={cn(
        'workflow-node absolute cursor-pointer rounded-full flex flex-col items-center justify-center text-center p-2',
        'workflow-animate-float',
        sizeClasses[size],
        isActive && 'active workflow-animate-glow',
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${Math.random() * 2}s`
      }}
      onClick={() => onClick?.(id)}
    >
      {icon && (
        <div className="mb-1 text-primary-foreground opacity-90">
          {icon}
        </div>
      )}
      <div className="font-semibold text-primary-foreground text-xs leading-tight">
        {title}
      </div>
      {description && (
        <div className="text-primary-foreground/70 text-[10px] mt-1 line-clamp-2">
          {description}
        </div>
      )}
    </div>
  );
};