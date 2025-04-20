
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', events: 4 },
  { name: 'Feb', events: 6 },
  { name: 'Mar', events: 8 },
  { name: 'Apr', events: 12 },
  { name: 'May', events: 10 },
  { name: 'Jun', events: 15 },
];

const Reports = () => {
  return (
    <div className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">Reports & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Events</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="events" fill="hsl(222.2 47.4% 11.2%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
