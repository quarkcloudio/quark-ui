import React from 'react';
import { Map as AMap, Marker } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';
import {
  Form,
  Input
} from 'antd';

const Map: React.FC<any> = (props:any) => {

  const markerEvents = {
    dragend: (instance: any) => {

    },
  };

  // on select item
  const onMapSelect = (e: any) => {
    if (e.poi.location) {

    }
  };

  return (
    <Form.Item
      key={props.name}
      label={props.label}
      rules={props.frontendRules}
      help={props.help ? props.help : undefined}
      extra={props.extra}
    >
      <Form.Item
        style={{ display: 'inline-block', width: '188px' }}
      >
        <Input
          addonBefore="经度"
          value={
            formMapPosition
              ? formMapPosition[props.name].longitude
              : null
          }
          size={props.size}
        />
      </Form.Item>
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
      <Form.Item
        style={{ display: 'inline-block', width: '188px' }}
      >
        <Input
          addonBefore="纬度"
          value={
            formMapPosition
              ? formMapPosition[props.name].latitude
              : null
          }
          size={props.size}
        />
      </Form.Item>
      <div style={props.style}>
        <AMap
          center={{
            longitude: formMapPosition
              ? formMapPosition[props.name].longitude
              : null,
            latitude: formMapPosition
              ? formMapPosition[props.name].latitude
              : null,
          }}
          plugins={['ToolBar']}
          amapkey={props.mapKey}
          zoom={props.zoom}
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
            position={{
              longitude: formMapPosition
                ? formMapPosition[props.name].longitude
                : null,
              latitude: formMapPosition
                ? formMapPosition[props.name].latitude
                : null,
            }}
            visible={true}
            clickable={true}
            draggable={true}
          />
        </AMap>
      </div>
    </Form.Item>
  );
}

export default Map;