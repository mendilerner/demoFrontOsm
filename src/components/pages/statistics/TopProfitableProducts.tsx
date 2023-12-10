import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import useData from './useData'


const TopProfitableProducts= () => {
    const data = useData("topProducts")
  return (
    <ResponsiveContainer width="80%" height="80%" style={{ backgroundColor: '#ffffff', padding: '1em', borderRadius: '0.8em' }}>
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="productName" tick={{ fill: '#black' }} />
                                <YAxis tick={{ fill: '#black' }} axisLine={{ stroke: 'black' }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="profits" fill="#14fe03" activeBar={<Rectangle fill="#b39ddb" stroke="black" />} />
                                <Bar dataKey="unitsSold" fill="#82ca9d" activeBar={<Rectangle fill="#c5e1a5" stroke="black" />} />
                                <text x="60%" y="10" textAnchor="middle" dominantBaseline="middle" fill="#000000" fontSize="18">
                                    Your Chart Title
                                </text>
                            </BarChart>
                        </ResponsiveContainer>
  )
}

export default TopProfitableProducts