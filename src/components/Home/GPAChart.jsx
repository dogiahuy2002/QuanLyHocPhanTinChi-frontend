import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const GPAChart = ({ grades }) => {
  const data = grades.map(g => ({
    name: `HK${g.term}/${g.year}`,
    GPA10: g.avgScore10,
    GPA4: g.avgScore4,
  }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Biểu đồ điểm trung bình học kỳ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Line type="monotone" dataKey="GPA10" stroke="#8884d8" name="GPA hệ 10" />
          <Line type="monotone" dataKey="GPA4" stroke="#82ca9d" name="GPA hệ 4" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GPAChart;
