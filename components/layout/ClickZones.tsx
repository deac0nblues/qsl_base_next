'use client';

interface ClickZonesProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function ClickZones({ onPrev, onNext }: ClickZonesProps) {
  return (
    <>
      {/* Left click zone – go to previous */}
      <div
        onClick={onPrev}
        aria-label="Previous slide"
        role="button"
        tabIndex={-1}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: '15vw',
          zIndex: 10,
          cursor: 'w-resize',
        }}
      />
      {/* Right click zone – go to next */}
      <div
        onClick={onNext}
        aria-label="Next slide"
        role="button"
        tabIndex={-1}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: '15vw',
          zIndex: 10,
          cursor: 'e-resize',
        }}
      />
    </>
  );
}
