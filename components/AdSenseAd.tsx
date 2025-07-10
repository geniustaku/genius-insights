'use client';
import { useEffect } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({ 
  adSlot, 
  adFormat = "auto",
  adLayout,
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ""
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // Push the ad to AdSense
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  const adProps: any = {
    className: `adsbygoogle ${className}`,
    style: style,
    'data-ad-client': "ca-pub-2849262030162416",
    'data-ad-slot': adSlot,
    'data-ad-format': adFormat,
    'data-full-width-responsive': fullWidthResponsive.toString()
  };

  // Add layout attribute if specified (for in-article ads)
  if (adLayout) {
    adProps['data-ad-layout'] = adLayout;
  }

  return <ins {...adProps} />;
}