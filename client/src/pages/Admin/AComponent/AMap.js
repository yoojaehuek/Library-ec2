import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const AMap = () => {
  const korea = [127.7669, 35.9078];
  const [hoverGeo, setHoverGeo] = useState(null);

  const handleMouseIn = (geoId) => {
    setHoverGeo(geoId);
  };

  const handleMouseOut = () => {
    setHoverGeo(null);
  };

  return (
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <ComposableMap
        projectionConfig={{
          scale: 200,
          rotation: [-11, 0, 0],
        }}
        style={{
          width: '100%',
          height: '50vh',
        }}
      >
        <Geographies geography="/features.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={hoverGeo === geo.rsmKey ? 'yellow' : '#EAEAEC'}
                stroke="#D6D6DA"
                onMouseEnter={() => handleMouseIn(geo.rsmKey)}
                onMouseLeave={handleMouseOut}
              />
            ))
          }
        </Geographies>
        <Marker coordinates={korea}>
          <circle r={5} fill="black" />
        </Marker>
      </ComposableMap>
    </div>
  );
};

export default AMap;
