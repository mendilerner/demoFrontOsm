import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useData from './useData'


const CompletedOrders = () => {
    const data = useData("CompletedOrders")
  return (
    <ResponsiveContainer width="80%" height="80%" style={{ backgroundColor: '#ffffff', padding: '1em', borderRadius: '0.8em',border: 'solid black 0.1px' }}>
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
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="completedOrders" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            <text x="50%" y="10" textAnchor="middle" dominantBaseline="middle" fill="#000000" fontSize="18">
                                Your Chart Title
                            </text>
                        </AreaChart>
                    </ResponsiveContainer>
  )
}

export default CompletedOrders