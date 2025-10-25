
'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Make sure window.VANTA is accessible
const Vanta = (window as any).VANTA;

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect: any;
    if (Vanta && !vantaEffect) {
       effect = Vanta.GLOBE({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xf6f6fb,
        color2: 0x1932cc,
        backgroundColor: 0x0
      });
      setVantaEffect(effect);
    }
    return () => {
      if (effect) effect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 z-0 h-full w-full" />;
};

export default VantaBackground;
