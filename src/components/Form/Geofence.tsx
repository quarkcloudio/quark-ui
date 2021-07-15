import React, { useState } from 'react';
import { Map as AMap, Marker, Polygon, Polyline, PolyEditor } from 'react-amap';
import Autocomplete from 'react-amap-plugin-autocomplete';
import {
  Input,
  Button
} from 'antd';

export interface Map {
  zoom?:any;
  mapKey?: any;
  value?: any;
  style?:any;
  onChange?:(value: any) => void;
}

const Geofence: React.FC<Map> = ({ zoom=null, mapKey=undefined, value={ center: { longitude: undefined, latitude: undefined}, points: []}, style=[], onChange }) => {

  const [mapData, setMapData] = useState({ center: { longitude: undefined, latitude: undefined}, points: [] });
  const [polygonActive, setPolygonActive] = useState(false);

  const markerEvents = {
    dragend: (instance: any) => {
      let mapData = {
        center: { longitude: undefined, latitude: undefined},
        points: []
      }
      mapData.center.longitude = instance.lnglat.lng;
      mapData.center.latitude = instance.lnglat.lat;

      let points = [
        {
          longitude : instance.lnglat.lng + 0.005,
          latitude : instance.lnglat.lat + 0.005
        },
        {
          longitude : instance.lnglat.lng + 0.005,
          latitude : instance.lnglat.lat - 0.005
        },
        {
          longitude : instance.lnglat.lng - 0.005,
          latitude : instance.lnglat.lat - 0.005
        },
        {
          longitude : instance.lnglat.lng - 0.005,
          latitude : instance.lnglat.lat + 0.005
        }
      ];

      mapData.points = points;

      setMapData(mapData);
      triggerChange({ ...mapData });
    },
  };
  
  const editorEvents = {
    created: (instance:any) => {console.log(instance)},
    addnode: (instance:any) => {
      // 通过鼠标在折线上增加一个节点或在多边形上增加一个顶点时触发此事件
      console.log(instance)
    },
    adjust: (instance:any) => {
      // 鼠标调整折线上某个节点或多边形上某个顶点的位置时触发此事件
      console.log('polyeditor adjust')
    },
    removenode: (instance:any) => {
      // 通过鼠标在折线上删除一个节点或在多边形上删除一个顶点时触发此事件
      console.log('polyeditor removenode')
    },
    end: (instance:any) => {
      // 在调用close方法时，触发该事件，target即为编辑后的折线/多边形实例
      console.log(instance.target.getPath());

      let getPaths = instance.target.getPath();

      let getMapData = {
        center: { longitude: undefined, latitude: undefined},
        points: []
      }

      let getPosition:any = { longitude: undefined, latitude: undefined};
      if(mapData.center.latitude && mapData.center.longitude) {
        getPosition = mapData.center;
      } else {
        getPosition = value.center;
      }

      getMapData.center = getPosition;

      let points:any = [];

      points = getPaths.map((item:any) => {
        return {
          longitude: item.lng,
          latitude : item.lat
        };
      })

      getMapData.points = points;

      setMapData(getMapData);
      triggerChange({ ...getMapData });

    },
  };

  const triggerChange = (changedValue:any) => {
    if (onChange) {
      onChange({...value, ...changedValue });
    }
  };

  const onMapSelect = (e: any) => {
    if (e.poi.location) {
      let mapData = {
        center: { longitude: undefined, latitude: undefined},
        points: []
      }
      mapData.center.longitude = e.poi.location.lng;
      mapData.center.latitude = e.poi.location.lat;

      let points = [
        {
          longitude : e.poi.location.lng + 0.005,
          latitude : e.poi.location.lat + 0.005
        },
        {
          longitude : e.poi.location.lng + 0.005,
          latitude : e.poi.location.lat - 0.005
        },
        {
          longitude : e.poi.location.lng - 0.005,
          latitude : e.poi.location.lat - 0.005
        },
        {
          longitude : e.poi.location.lng - 0.005,
          latitude : e.poi.location.lat + 0.005
        }
      ];

      mapData.points = points;

      setMapData(mapData)
      triggerChange({ ...mapData });
    }
  };

  let getPosition:any = { longitude: undefined, latitude: undefined};

  if(mapData.center.latitude && mapData.center.longitude) {
    getPosition = mapData.center;
  } else {
    getPosition = value.center;
  }

  let getPoints:any = [];

  if(mapData.points.length>0) {
    getPoints = mapData.points;
  } else {
    getPoints = value.points;
  }

  console.log(getPoints);

  return (
    <>
      <div style={style}>
        <AMap
          center={{
            longitude: getPosition.longitude,
            latitude: getPosition.latitude
          }}
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
              right: 105,
              borderRadius: 4,
              border: '1px solid #1890FF',
              height: 32,
              width: 200,
              color: 'rgba(0, 0, 0, 0.65)',
              padding: '4px 11px',
            }}
            placeholder="请输入关键字"
          />
          <Button
            style={{
              position: 'absolute',
              top: 20,
              right: 10,
            }}
            type="primary"
            onClick={() => {
              polygonActive ? setPolygonActive(false) : setPolygonActive(true);
            }}
          >
            {polygonActive ? '保存围栏' : '编辑围栏'}
          </Button>
          <Marker
            events={markerEvents}
            position={{
              longitude: getPosition.longitude,
              latitude: getPosition.latitude
            }}
            visible={true}
            clickable={true}
            draggable={true}
          />
          <Polygon path={getPoints}>
            <PolyEditor active={polygonActive} events={editorEvents} />
          </Polygon>
        </AMap>
      </div>
    </>
  );
}

export default Geofence;