import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import api from '../../services/api';

const GraficoEntradaSaida = ({ idOficina }) => {
  const [dataEntradas, setDataEntradas] = useState([]);
  const [dataSaidas, setDataSaidas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEntradas = await api.get(`/financeiro/info-12-meses/${idOficina}`);
        const responseSaidas = await api.get(`/financeiro/info-12-meses/${idOficina}`); // Ajustar endpoint de saídas se necessário

        const entradas = responseEntradas.data.map(item => ({
          x: item.mes,
          y: item.entradas,
        }));

        const saidas = responseSaidas.data.map(item => ({
          x: item.mes,
          y: item.saidas,
        }));

        setDataEntradas(entradas);
        setDataSaidas(saidas);
      } catch (error) {
        console.error('Erro ao buscar dados do gráfico:', error);
      }
    };

    fetchData();
  }, [idOficina]);

  const data = [
    {
      id: 'Entradas',
      color: '#C66D2C',
      data: dataEntradas,
    },
    {
      id: 'Saídas',
      color: '#89532B',
      data: dataSaidas,
    },
  ];

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
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        lineWidth={3}
        pointSize={10}
        pointBorderWidth={2}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX"
        colors={{ datum: 'color' }}
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
          tooltip: {
            container: {
              fontFamily: 'Product-Sans',
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