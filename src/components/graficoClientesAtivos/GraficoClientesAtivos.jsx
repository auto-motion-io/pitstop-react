import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// Gerar dados para o gráfico de linha
const data = [
  {
    id: 'Clientes Ativos',
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
];

const GraficoClientesAtivos = () => {
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
        colors={{ datum: 'color' }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }} // Cor de preenchimento dos pontos
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX" // Linhas curvadas
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
          legends: {
            text: {
              fontFamily: 'Product-Sans', // Aplicar família de fontes aos textos das legendas
              fontSize: 12,
            },
          },
          tooltip: {
            container: {
              fontFamily: 'Product-Sans', // Aplicar família de fontes ao tooltip
            },
          },
        }}
        pointSymbol={(props) => (
          <circle
            cx={props.x}
            cy={props.y}
            r={5} // Tamanho do ponto
            fill="#C66D2C" // Cor de preenchimento dos pontos
            stroke="#C66D2C" // Cor da borda dos pontos
            strokeWidth={2} // Largura da borda dos pontos
          />
        )}
      />
    </div>
  );
};

export default GraficoClientesAtivos;
