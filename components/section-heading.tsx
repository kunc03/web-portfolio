import React from 'react';
import clsx from 'clsx';

type SectionHeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={clsx("text-3xl sm:text-4xl font-heading font-medium capitalize mb-8 text-center", className)}>
      {children}
    </h2>
  );
}
