/* eslint-disable max-len */
import Image from 'next/image';
import React, { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import useIntersectionObserver from '@/shareds/hooks/useIntersectionObserver';
import { useCurrentBreakpoint } from '@/shareds/providers/BreakpointContext';
import styles from './styles.module.scss';

interface IPropsPhoneVideo {
  isPlay: boolean
  isPartners?: boolean
  isClient?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function PhoneVideo({ isPlay, isPartners, isClient }: IPropsPhoneVideo) {
  const phoneVideoRef = useRef<HTMLVideoElement | null>(null);
  const breakpoint = useCurrentBreakpoint();
  const isSmallScreens = useMemo(() => breakpoint !== 'lg' && breakpoint !== 'xl', [breakpoint]);
  const [contrainerRef, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });
  useEffect(() => {
    const videoElement = phoneVideoRef?.current;
    if (videoElement) {
      if (isIntersecting) {
        videoElement.currentTime = isSmallScreens ? 1.8 : 0;
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  }, [isIntersecting, contrainerRef, isSmallScreens]);

  useEffect(() => {
    const videoElement = phoneVideoRef?.current;
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (videoElement) {
            videoElement.src = isPartners ? '/videos/PhonePartners.mp4' : '/videos/Phone.mp4';
            videoElement.play();
          }
          observer.disconnect();
        }
      });
    };
    const handleLoadedMetadata = () => {
      if (!videoElement) return;
      if (!isPartners) videoElement.currentTime = 2.1;
      if (isClient) videoElement.currentTime = 3;
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '50px',
      threshold: 0.01,
    });

    if (phoneVideoRef.current) {
      observer.observe(phoneVideoRef.current);
    }
    videoElement?.addEventListener('play', handleLoadedMetadata);
    return () => {
      observer.disconnect();
      videoElement?.removeEventListener('play', handleLoadedMetadata);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPartners, isClient]);
  return (
    <div
      ref={contrainerRef}
      className={styles.videoWrapper}
    >
      <div className={styles.videoPhone} style={{ position: 'relative' }}>
        <div className={clsx(styles.videoPhoneMask, isPlay && styles.videoBlockAnimation)}>
          <Image
            src={isPartners ? '/videos/first_frame_partners' : '/videos/first_frame.jpg'}
            alt="poster"
            className={styles.baseVideo}
            layout="fill"
            style={{ zIndex: 0 }}
          />
          <video
            ref={phoneVideoRef}
            style={{ zIndex: 1 }}
            className={styles.baseVideo}
            poster={isPartners ? '/videos/first_frame_partners' : '/videos/first_frame.jpg'}
            playsInline
            muted
            loop
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(PhoneVideo);
