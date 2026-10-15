import { useEffect, useRef } from 'react';
import { startMotion } from '../motion.js';

export default function ParticleBackground() {
  const canvas = useRef(null);
  const progress = useRef(null);
  useEffect(() => startMotion(canvas.current, progress.current, document.querySelector('.photo-mount')), []);
  return <><canvas ref={canvas} id="particle-field" aria-hidden="true" /><div className="reading-progress" aria-hidden="true"><span ref={progress} id="reading-progress-fill" /></div></>;
}
