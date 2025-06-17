'use client';

import { useRef } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { appConfig } from '@/configs';
import { useTourItinerary } from './TourItineraryProvider';
import { Spinner } from '@/components/ui/spinner';

type MapLocation = {
  lat: number;
  lng: number;
  label: string;
  activeDay: number;
};

type MapLocationGroup = MapLocation & {
  days: number[];
};

function groupByLabel(data: MapLocation[]): MapLocationGroup[] {
  const grouped: Record<string, any> = {};

  data.forEach(({ lat, lng, label, activeDay }) => {
    if (!grouped[label]) {
      grouped[label] = { lat, lng, label, days: [] };
    }
    grouped[label].days.push(activeDay);
  });

  return Object.values(grouped);
}

function TourMap() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const { itinerary, activeDay, setCurrentDay } = useTourItinerary();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: appConfig.gmId,
  });

  if (!isLoaded) {
    return (
      <div className="flex h-[300px] w-full justify-center">
        <Spinner size="large" />
      </div>
    );
  }

  const mapLocations = itinerary.reduce((result, item, index) => {
    return [
      ...result,
      ...item.regions.map(region => ({
        lat: region.lat,
        lng: region.lng,
        label: region.name,
        activeDay: index,
      })),
    ];
  }, [] as MapLocation[]);
  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
  };
  const onMarkerClick = (location: MapLocationGroup) => {
    setCurrentDay(location.days[0]);
  };

  const groupLocations = groupByLabel(mapLocations);

  const bounds = new google.maps.LatLngBounds();

  groupLocations.forEach(coord => {
    bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
  });

  mapRef.current?.fitBounds(bounds);

  const center = bounds.getCenter();

  const zoom = groupLocations.length > 1 ? 6 : 8;

  return (
    <GoogleMap
      mapContainerClassName="h-[300px] lg:h-[400px] md:h-full w-full"
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={map => {
        mapRef.current = map;
      }}>
      {groupLocations.map((location, index) => (
        <Marker
          key={index}
          position={{ lat: location.lat, lng: location.lng }}
          clickable
          onClick={() => onMarkerClick(location)}
          icon={{
            url: location.days.includes(activeDay)
              ? '/images/icons/active-marker.svg'
              : '/images/icons/marker.svg',
            scaledSize: new window.google.maps.Size(60, 60),
          }}
          label={{
            text: `${location.days[0] + 1}`,
            color: 'white',
            className: `mt-4 font-semibold`,
            fontSize: '12px',
          }}
        />
      ))}
    </GoogleMap>
  );
}

export default TourMap;
