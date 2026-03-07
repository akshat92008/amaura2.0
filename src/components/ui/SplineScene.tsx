import { useEffect } from 'react';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
    }
  }
}

export const SplineScene = ({ scene, className = "" }: SplineSceneProps) => {
  useEffect(() => {
    // Dynamically load the spline-viewer script if not present
    if (!document.querySelector('script[src="https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js';
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full h-full relative overflow-hidden ${className}`}>
      <spline-viewer 
        url={scene}
        class="w-full h-full"
        loading="lazy"
        interaction-events
      />
    </div>
  );
};
