import React from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';


const data = [
  { day: 'Segunda', value: 70 },
  { day: 'Terça', value: 60 },
  { day: 'Quarta', value: 70 },
  { day: 'Quinta', value: 80 },
  { day: 'Sexta', value: 90 },
  { day: 'Sábado', value: 40 },
  { day: 'Domingo', value: 80 },
];

const GraficoOrdensPendentes = () => {
  return (
    <div style={{ height: '30vh', width: '100%' }}>
      <ResponsiveBarCanvas
      pixelRatio={4}
        data={data}
        keys={['value']}
        indexBy="day"
        margin={{ top: 0, right: 0, bottom: 60, left: 0 }}
        padding={0.5}  
        groupMode="grouped"
        layout="vertical"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors="#C66D2C" 
        borderRadius={25}
        borderWidth={2}
        borderColor="#C66D2C"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null} 
        enableLabel={false} 
        isInteractive={true}
        enableGridX={false} 
        enableGridY={false} 
        theme={{
          fontFamily: 'Product-Sans', 
          axis: {
            ticks: {
              text: {
                fontFamily: 'Product-Sans', 
                fontSize: 12,
              },
            },
          },
          legends: {
            text: {
              fontFamily: 'Product-Sans', 
              fontSize: 12,
            },
          },
          tooltip: {
            container: {
              fontFamily: 'Product-Sans', 
            },
          },
        }}
      />
    </div>
  );
};

export default GraficoOrdensPendentes;
