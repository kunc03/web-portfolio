import React from 'react';

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return <h2 className="text-[4.286vw] sm:text-3xl font-medium capitalize mb-[4.571vw] sm:mb-8 text-center">{children}</h2>;
}
