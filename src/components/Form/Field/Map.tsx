import React, { useState } from 'react';
import { Map as AMap, Marker } from 'react-amap';
import Autocomplete from '../../AMap/AutoComplete';
import { Input } from 'antd';

export interface MapProps {
  zoom?: any;
  mapKey?: any;
  value?: any;
  style?: any;
  onChange?: (value: any) => void;
}

const Map: React.FC<MapProps> = ({
  zoom = null,
  mapKey = undefined,
  value = { longitude: undefined, latitude: undefined },
  style = [],
  onChange,
}) => {
  const [position, setMapPosition] = useState({
    longitude: undefined,
    latitude: undefined,
  });

  const markerEvents = {
    dragend: (instance: any) => {
      let position = {
        longitude: undefined,
        latitude: undefined,
      };
      position.longitude = instance.lnglat.lng;
      position.latitude = instance.lnglat.lat;
      setMapPosition(position);
      triggerChange({ ...position });
    },
  };

  const triggerChange = (changedValue: any) => {
    if (onChange) {
      onChange({ ...value, ...changedValue });
    }
  };

  const onMapSelect = (e: any) => {
    if (e.poi.location) {
      let position = {
        longitude: undefined,
        latitude: undefined,
      };
      position.longitude = e.poi.location.lng;
      position.latitude = e.poi.location.lat;
      setMapPosition(position);
      triggerChange({ ...position });
    }
  };

  let getPosition: any = { longitude: undefined, latitude: undefined };

  if (position.latitude && position.longitude) {
    getPosition = position;
  } else {
    getPosition = value;
  }

  return (
    <>
      <Input
        addonBefore="经度"
        value={getPosition ? getPosition.longitude : undefined}
        style={{
          display: 'inline-block',
          width: '188px',
          lineHeight: '32px',
        }}
      />
      <span
        style={{
          display: 'inline-block',
          width: '24px',
          lineHeight: '32px',
          textAlign: 'center',
        }}
      >
        -
      </span>
      <Input
        addonBefore="纬度"
        value={getPosition ? getPosition.latitude : undefined}
        style={{
          display: 'inline-block',
          width: '188px',
          lineHeight: '32px',
        }}
      />
      <div style={style}>
        <AMap
          center={
            getPosition.longitude && getPosition.latitude
              ? {
                  longitude: getPosition.longitude,
                  latitude: getPosition.latitude,
                }
              : undefined
          }
          plugins={['ToolBar']}
          amapkey={mapKey}
          zoom={zoom}
        >
          <Autocomplete
            options={[]}
            onSelect={(e: any) => onMapSelect(e)}
            style={{
              position: 'absolute',
              top: 20,
              right: 10,
              borderRadius: 4,
              border: '1px solid #1890FF',
              height: 34,
              width: 200,
              color: 'rgba(0, 0, 0, 0.65)',
              padding: '4px 11px',
            }}
            placeholder="请输入关键字"
          />
          <Marker
            events={markerEvents}
            position={
              getPosition.longitude && getPosition.latitude
                ? {
                    longitude: getPosition.longitude,
                    latitude: getPosition.latitude,
                  }
                : undefined
            }
            visible={true}
            clickable={true}
            draggable={true}
          />
        </AMap>
      </div>
    </>
  );
};

export default Map;
