import React, { useEffect, useState } from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';
import api from "../../services/api";

const GraficoOrdensPendentes = ({ idOficina }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/ordemDeServicos/quantidade-pendentes/${idOficina}`);
        const formattedData = response.data.map(item => ({
          day: item.diaSemana,
          value: item.qtd,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados das ordens pendentes:", error);
      }
    };

    fetchData();
  }, [idOficina]);

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