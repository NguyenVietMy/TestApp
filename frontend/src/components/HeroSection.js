import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

const heroContent = [
  { image: '/images/hero-merchandise.jpg', text: 'FUEL YOUR POWER' },
  { image: '/images/hero-bodybuilder.jpg', text: 'BECOME UNSTOPPABLE' },
  { image: '/images/hero-supplements.jpg', text: 'UNLEASH YOUR POTENTIAL' },
];

function getLayout(width) {
  if (width > 768) return 'desktop-layout';
  if (width > 375) return 'tablet-layout';
  return 'mobile-layout';
}

const HeroSection = () => {
  const [heroIndex, setHeroIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [layout, setLayout] = useState(() => getLayout(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      flushSync(() => setLayout(getLayout(window.innerWidth)));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      flushSync(() =>
        setHeroIndex(prev => (prev + 1) % heroContent.length)
      );
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  const current = heroContent[heroIndex];

  return (
    <section
      data-testid="hero-section"
      className={`hero ${layout}`}
      onMouseOver={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div data-testid="hero-content">
        <h1>{current.text}</h1>
        <p>{current.image}</p>
      </div>
    </section>
  );
};

export default HeroSection;
