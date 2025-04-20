
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface EventMapProps {
  lat: number;
  lng: number;
  className?: string;
}

const EventMap = ({ lat, lng, className }: EventMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For a real application, you would want to move this to an environment variable
    // For this demo, we create an input field where users can enter their Mapbox token
    const mapboxToken = localStorage.getItem('mapbox-token') || '';
    
    if (!mapboxToken) {
      return; // Don't initialize the map if there's no token
    }
    
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14
    });

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);
      
    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      map.current?.remove();
    };
  }, [lat, lng]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className={`absolute inset-0 rounded-md ${className}`} />
    </div>
  );
};

export default EventMap;
