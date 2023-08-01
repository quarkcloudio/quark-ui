import React, { useState, useEffect } from 'react';

declare const window: any;

export interface AutocompleteProps {
  __map__?: any;
  options: any;
  placeholder?: any;
  onSelect: Function;
  style?: any;
}

const Autocomplete: React.FC<React.RefAttributes<HTMLDivElement> & AutocompleteProps> = (props) => {
  const { __map__, options, placeholder, onSelect, style } = { ...props };
  const [geoloc, setGeoloc]:any = useState({});
  const [auto, setAuto]:any = useState({});

  useEffect(() => {
    loadWithOptions();
  }, []);

  // 加载配置
  const loadWithOptions = ()=>{
    const map = __map__;  
    if (!map) {
      console.log('组件必须作为 Map 的子组件使用');
      return;
    }
    if(!props.options){
      console.log('必须指定Autocomplete插件的配置参数');
      return;
    }
    if(typeof props.onSelect !== 'function') {
      console.log('必须指定onSelect回调函数');
      return;
    }
    map.plugin(['AMap.Autocomplete', 'AMap.Geocoder'], () => {
      let opts ={input: 'autoinput'};
      Object.assign(opts, options);
      const getAuto = new window.AMap.Autocomplete(opts);
      map.addControl(getAuto);
      window.AMap.event.addListener(getAuto, "select", onSelectChange); // 注册监听，当选中某条记录时会触发
      const getGeoloc = new window.AMap.Geocoder({});
      map.addControl(getGeoloc);
      setGeoloc(getGeoloc)
      setAuto(getAuto)
    });
  }

  const onSelectChange =(e:any) => {
    if(!e.poi.location) {
      const poi = e.poi;
      geoloc && geoloc.getLocation(poi.district + poi.address, (status:any, result:any) =>{
        if(result && result.info === "OK"){
          e.poi.location = result.geocodes[0].location;
        }
        onSelect(e);
      })
      return ;
    }
    onSelect(e);
  }

  return (
    <input id='autoinput' placeholder={placeholder} style={style} />
  );
};

export default Autocomplete;
