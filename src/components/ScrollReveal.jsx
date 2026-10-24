import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up', // 'fade-up' | 'scale' | 'fade-left' | 'fade-right'
  threshold = 0.12,
  triggerOnce = true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: threshold,
        rootMargin: '0px 0px -40px 0px' // triggers slightly before center
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold, triggerOnce]);

  const getAnimationStyles = () => {
    const baseTransition = `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.75s ease-out ${delay}ms`;

    if (!isVisible) {
      switch (animation) {
        case 'scale':
          return {
            opacity: 0,
            transform: 'scale(0.92) translateY(20px)',
            filter: 'blur(4px)',
            transition: baseTransition
          };
        case 'fade-left':
          return {
            opacity: 0,
            transform: 'translateX(-30px)',
            transition: baseTransition
          };
        case 'fade-right':
          return {
            opacity: 0,
            transform: 'translateX(30px)',
            transition: baseTransition
          };
        case 'fade-up':
        default:
          return {
            opacity: 0,
            transform: 'translateY(32px) scale(0.98)',
            filter: 'blur(3px)',
            transition: baseTransition
          };
      }
    }

    return {
      opacity: 1,
      transform: 'none',
      filter: 'none',
      transition: baseTransition
    };
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
}
