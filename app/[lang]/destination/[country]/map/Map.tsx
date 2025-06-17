'use client';

import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { appConfig } from '@/configs';
import { Spinner } from '@/components/ui/spinner';

type MapProps = {
  centerLocation?: {
    lat: number;
    lng: number;
  };
};

function Map({ centerLocation }: MapProps) {
  const mapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
  };

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

  return (
    <GoogleMap
      mapContainerClassName="w-full h-[565px] lg:h-[585px]"
      mapContainerStyle={{ width: '100%' }}
      center={centerLocation}
      zoom={8}
      options={mapOptions}
    />
  );
}

export default Map;
