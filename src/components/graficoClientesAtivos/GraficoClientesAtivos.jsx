import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import api from "../../services/api";

const GraficoClientesAtivos = ({ idOficina }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/ordemDeServicos/quantidade-mes/${idOficina}`);
        const formattedData = [{
          id: 'Ordens de Serviço',
          color: '#C66D2C',
          data: response.data.map(item => ({
            x: item.mes,
            y: item.qtd,
          })),
        }];
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados das ordens de serviço:", error);
      }
    };

    fetchData();
  }, [idOficina]);

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
        colors={{ datum: 'color' }}
        lineWidth={3}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        curve="monotoneX"
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
        pointSymbol={(props) => (
          <circle
            cx={props.x}
            cy={props.y}
            r={5}
            fill="#C66D2C"
            stroke="#C66D2C"
            strokeWidth={2}
          />
        )}
      />
    </div>
  );
};

export default GraficoClientesAtivos;