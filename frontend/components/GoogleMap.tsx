import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  className?: string;
}

export function GoogleMap({ center, zoom = 15, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: "AIzaSyB9t8aWukxikJBMNG_0ZfN1iPmgADre3pI",
        version: "weekly",
        libraries: ["places"]
      });

      try {
        const google = await loader.load();
        
        const map = new google.maps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // Add marker
        new google.maps.Marker({
          position: center,
          map: map,
          title: "Kata Sweet Shop",
          animation: google.maps.Animation.DROP
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 8px 0; color: #ea580c; font-size: 16px; font-weight: bold;">Kata Sweet Shop</h3>
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #374151;">Pune Hadapsar, 411028</p>
              <p style="margin: 0 0 4px 0; font-size: 14px; color: #374151;">Phone: +91 9067722873</p>
              <p style="margin: 0; font-size: 14px; color: #374151;">Email: tejasdharmale6@gmail.com</p>
            </div>
          `
        });

        // Open info window by default
        infoWindow.open(map);
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, [center, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-96 rounded-lg shadow-lg ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}
