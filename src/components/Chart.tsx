import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mock_data = [
  {
    time: 2,
    alfa1: 1,
    hr: 150,
  },
  {
    time: 4,
    alfa1: 1.2,
    hr: 130,
  },
  {
    time: 6,
    alfa1: 1,
    hr: 150,
  },
  {
    time: 8,
    alfa1: 0.8,
    hr: 160,
  },
  {
    time: 10,
    alfa1: 0.6,
    hr: 170,
  },
  {
    time: 12,
    alfa1: 0.4,
    hr: 180,
  },
  {
    time: 14,
    alfa1: 1,
    hr: 150,
  },
];

const secondsToMins = (seconds) => {
    const convertedTime = new Date(seconds * 1000).toISOString().substr(14, 5)
    return convertedTime
}

const Chart = ({data}) => {

    const getIntersectionPercentage = (data, val) => {
        const min = Math.min( ...data ) 
        const max = Math.max( ...data ) 
        return 100 - ((val - min)/(max - min))*100
    }
    const proc = getIntersectionPercentage((data || mock_data).map(el => el.alfa1), 0.75)

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
        //   width={500}
        //   height={300}
          data={data || mock_data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <defs>
            <linearGradient id="alfa1color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="green"/>
            <stop offset={`${proc}%`} stopColor="lightgreen"/>
            <stop offset={`${proc}%`} stopColor="orange"/>
            <stop offset="100%" stopColor="red"/>
            </linearGradient>
        </defs>
          <XAxis dataKey="time" tickMargin={12} tickFormatter={(el) => secondsToMins(el)} tickSize={1} tickCount={10} domain={['dataMin', 'dataMax']} />  //ticks={(data || mock_data).map(el => secondsToMins(el.time))}
          <YAxis dataKey="alfa1" yAxisId="left"  type="number" domain={[0, 1.5]} tickCount={(1.5/0.25)+1}/>
          <YAxis dataKey="hr" yAxisId="right" orientation="right" type="number"domain={['dataMin - 50', 'dataMax +20']} />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" dataKey="alfa1" stroke="url(#alfa1color)" dot={false} activeDot={{ r: 8 }} strokeWidth={2}/>
          <Line strokeDasharray="3 3" yAxisId="right" dataKey="hr" stroke="red" dot={false} activeDot={{ r: 8 }} />
          <Line type="monotone" legendType="none" yAxisId="left" dataKey={() => 0.75} stroke="green" dot={false} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
}

export default Chart
