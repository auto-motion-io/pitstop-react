import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'Entradas',
    color: '#C66D2C',
    data: [
      { x: 'Janeiro', y: 70 },
      { x: 'Fevereiro', y: 60 },
      { x: 'Março', y: 70 },
      { x: 'Abril', y: 80 },
      { x: 'Maio', y: 90 },
      { x: 'Junho', y: 40 },
      { x: 'Julho', y: 80 },
      { x: 'Agosto', y: 70 },
      { x: 'Setembro', y: 80 },
      { x: 'Outubro', y: 60 },
      { x: 'Novembro', y: 70 },
      { x: 'Dezembro', y: 80 },
    ],
  },
  {
    id: 'Saídas',
    color: '#89532B',
    data: [
      { x: 'Janeiro', y: 50 },
      { x: 'Fevereiro', y: 30 },
      { x: 'Março', y: 40 },
      { x: 'Abril', y: 60 },
      { x: 'Maio', y: 70 },
      { x: 'Junho', y: 20 },
      { x: 'Julho', y: 50 },
      { x: 'Agosto', y: 40 },
      { x: 'Setembro', y: 60 },
      { x: 'Outubro', y: 30 },
      { x: 'Novembro', y: 40 },
      { x: 'Dezembro', y: 60 },
    ],
  },
];

const GraficoEntradaSaida = () => {
  return (
    <div style={{ height: '30vh', width: '100%' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 15, right: 50, bottom: 60, left: 15 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null} // Ocultar eixo esquerdo
        enableGridX={false} // Desativar linhas de grid vertical
        enableGridY={false} // Desativar linhas de grid horizontal
        lineWidth={3}
        pointSize={10}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX" // Linhas curvadas
        colors={{ datum: 'color' }} // Usar a cor especificada nos dados
        theme={{
          fontFamily: 'Product-Sans', // Definir família de fontes para Product-Sans
          axis: {
            ticks: {
              text: {
                fontFamily: 'Product-Sans', // Aplicar família de fontes aos ticks dos eixos
                fontSize: 12,
              },
            },
          },
          tooltip: {
            container: {
              fontFamily: 'Product-Sans', // Aplicar família de fontes ao tooltip
            },
          },
        }}
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 50,
            itemsSpacing: 2,
            itemDirection: 'left-to-right',
            itemWidth: 100,
            itemHeight: 15,
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default GraficoEntradaSaida;
