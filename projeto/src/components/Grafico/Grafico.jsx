
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './Grafico.css'; 
import { useContext } from 'react';
import { Mycontext } from '../../context/ContextGlobalUser';

const Grafico = () => {

  const {user} = useContext(Mycontext)
  console.log(user);
  
 
  const dataLine = [
    { name: 'Jan', trilhas: 2 },
    { name: 'Fev', trilhas: 3 },
    { name: 'Mar', trilhas: 1 },
    { name: 'Abr', trilhas: 4 },
    { name: 'Mai', trilhas: 6 },
    { name: 'Jun', trilhas: 8 },
    { name: 'Jul', trilhas: 5 },
    { name: 'Ago', trilhas: 7 },
    { name: 'Set', trilhas: 4 },
    { name: 'Out', trilhas: 3 },
    { name: 'Nov', trilhas: 5 },
    { name: 'Dez', trilhas: 4 },
  ];

 
  const dataPie = [
    { name: 'Norte', value: 30, color: '#4F46E5' },   
    { name: 'Leste', value: 40, color: '#10B981' },   
    { name: 'Norte', value: 30, color: '#EF4444' },   
  ];

  return (
    <div className="dashboard-container">
      <h2 className="greeting">Olá, {user.nome}</h2>

      <div className="charts-row">
        <div className="chart-card line-chart">
          <h3>Trilhas concluídas por mês</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line type="monotone" dataKey="trilhas" stroke="#F3F4F6" strokeWidth={3} dot={{ fill: '#F3F4F6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      
        <div className="chart-card pie-chart">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {dataPie.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="middle"
                layout="vertical"
                align="right"
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: '#F3F4F6' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="stats-row">
       
        <div className="stats-card">
          <h3>Estatísticas</h3>
          <div className="stat-item">
            <span>Trilhas concluídas:</span>
            <strong>32</strong>
          </div>
          <div className="stat-item">
            <span>Horas em trilha:</span>
            <strong>50h</strong>
          </div>
          <div className="stat-item">
            <span>Horas em trilha:</span>
            <strong>50h</strong>
          </div>
        </div>

        
        <div className="activities-card">
          <h3>Atividades recentes</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span>Trilha Lagoinha do Leste</span>
              <span className="status concluida">Concluída 100%</span>
            </div>
            <div className="activity-item">
              <span>Trilha Do Gravata</span>
              <span className="status concluida">Concluída 100%</span>
            </div>
            <div className="activity-item">
              <span>Trilha Do Morro Das Aranhas</span>
              <span className="status concluida">Concluída 100%</span>
            </div>
          </div>
          <div className="completion-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray="100, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">100%</text>
            </svg>
            <span>Trilhas Concluídas</span>
          </div>
          <button className="new-trail-btn">Encontrar nova trilha!</button>
        </div>
      </div>
    </div>
  );
};

export default Grafico;