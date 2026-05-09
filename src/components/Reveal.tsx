import { type ElementType, type ReactNode, useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
} & Record<string, unknown>;

export function Reveal({ children, className = '', as = 'div', ...rest }: RevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = as;
  return (
    <Component
      ref={ref}
      className={`${className} reveal${visible ? ' visible' : ''}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}
