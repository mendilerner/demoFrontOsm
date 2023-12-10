import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useData from './useData'


const Profits = () => {
    const data = useData("profitsAndRevenue")
  return (
    <ResponsiveContainer width="85%" height="80%" style={{ backgroundColor: '#ffffff', padding: '1em', borderRadius: '0.8em' }}>
                        <AreaChart
                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="profits" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#6d66fd" fill="#8884d8" />
                            <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fill="#000000" fontSize="18">
                                Your Chart Title
                            </text>
                        </AreaChart>
                    </ResponsiveContainer>
  )
}

export default Profits