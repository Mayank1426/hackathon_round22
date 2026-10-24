import React, { useState, useEffect } from 'react';

/**
 * TypewriterText - Reusable, smooth typewriter effect with blinking cursor
 * @param {string[]} phrases - Array of phrases to cycle through
 * @param {string} className - Additional CSS classes for text styling
 * @param {string} cursorClass - Additional CSS classes for the blinking cursor
 * @param {number} typingSpeed - Typing speed in ms (default: 60)
 * @param {number} deletingSpeed - Deleting speed in ms (default: 30)
 * @param {number} pauseMs - Pause time after a phrase is fully typed in ms (default: 2200)
 */
export default function TypewriterText({
  phrases = [],
  className = 'text-gradient-purple inline-block',
  cursorClass = 'bg-purple-600',
  typingSpeed = 60,
  deletingSpeed = 30,
  pauseMs = 2200,
}) {
  if (!phrases || phrases.length === 0) return null;

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [currentText, setCurrentText] = useState(phrases[0] || '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = phrases[phraseIdx] || '';
    let timer;

    if (!isDeleting && currentText === targetPhrase) {
      // Pause when phrase finishes typing
      timer = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && currentText === '') {
      // Switch to next phrase
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
      timer = setTimeout(() => {}, 300);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? targetPhrase.substring(0, currentText.length - 1)
            : targetPhrase.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIdx, phrases, pauseMs, deletingSpeed, typingSpeed]);

  return (
    <span className="inline-flex items-baseline">
      <span className={className}>{currentText}</span>
      <span
        className={`inline-block w-1 sm:w-1.5 h-[0.8em] ml-1.5 align-middle animate-pulse rounded-full shadow-sm ${cursorClass}`}
        aria-hidden="true"
      />
    </span>
  );
}
