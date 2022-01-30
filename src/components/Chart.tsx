import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mock_data = [
  {
    time: '2',
    alfa1: 4000,
    hr: 2400,
  },
  {
    time: '4',
    alfa1: 3000,
    hr: 1398,
  },
  {
    time: '6',
    alfa1: 2000,
    hr: 9800,
  },
  {
    time: '8',
    alfa1: 2780,
    hr: 3908,
  },
  {
    time: '10',
    alfa1: 1890,
    hr: 4800,
  },
  {
    time: '12',
    alfa1: 2390,
    hr: 3800,
  },
  {
    time: '14',
    alfa1: 3490,
    hr: 4300,
  },
];

const Chart = ({data}) => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data || mock_data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time"  type="number" tickCount={10} domain={['dataMin', 'dataMax']} />
          <YAxis dataKey="alfa1" yAxisId="left"  type="number" domain={[0, 1.5]} tickCount={(1.5/0.25)+1}/>
          <YAxis dataKey="hr" yAxisId="right" orientation="right" type="number"domain={['dataMin - 50', 'dataMax +20']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" yAxisId="left" dataKey="alfa1" stroke="orange" dot={false} activeDot={{ r: 8 }} />
          <Line type="monotone" yAxisId="right" dataKey="hr" stroke="red" dot={false} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default Chart
