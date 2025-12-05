
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import './Grafico.css'; 
import { useContext, useEffect, useState } from 'react';
import { Mycontext } from '../../context/ContextGlobalUser';
import buscarInfosDashBord from '../../server/buscarInformacao/buscarInfosDashBord';
import buscarCardsTrilhaOff from '../../server/buscarInformacao/buscarCardsTrilhaOff';
import { useNavigate } from 'react-router-dom'

const Grafico = () => {

  const navegacao = useNavigate()
  const {user} = useContext(Mycontext)

  const [dadosDas,setDadosDas]= useState({})

  async function buscarDados(localStorege) {
    
     const dados= await buscarInfosDashBord(localStorege.token)

     const trilhas =await buscarCardsTrilhaOff()

     
    if (dados.ok && trilhas.ok) {

      setDadosDas({...dados.result, totalTrilhas:trilhas.result.length })

      
      

      
      return
      
    }

  }


  console.log(dadosDas);
  
  
  function percentual() {
    return (dadosDas.Total_de_Trilhas_Feitas * 100) /dadosDas.totalTrilhas 
  
  }

  useEffect(()=>{ 
    const localStorege = JSON.parse(localStorage.getItem('user'))
  
      if (localStorege) {
        buscarDados(localStorege)

        
      }
    
    
  },[])


 
  const dataLine = [
    { name: 'Jan', trilhas: dadosDas.Janeiro},
    { name: 'Fev', trilhas: dadosDas.Fevereiro},
    { name: 'Mar', trilhas: dadosDas.Março},
    { name: 'Abr', trilhas: dadosDas.Abril},
    { name: 'Mai', trilhas: dadosDas.Maio},
    { name: 'Jun', trilhas: dadosDas.Junho},
    { name: 'Jul', trilhas: dadosDas.Julho },
    { name: 'Ago', trilhas: dadosDas.Agosto },
    { name: 'Set', trilhas: dadosDas.Setembro },
    { name: 'Out', trilhas: dadosDas.Outubro },
    { name: 'Nov', trilhas: dadosDas.Novembro },
    { name: 'Dez', trilhas: dadosDas.Dezembro },
  ];
   


 
  const dataPie = [ 
     
    
    { name: 'Região Central', value: Number(dadosDas.Quantidade_de_Trilhas_na_Regiao_Central) , color: '#000000' },   
    { name: 'Região Leste', value: Number(dadosDas.Quantidade_de_Trilhas_na_Regiao_Leste), color: '#00A2E8' },   
    { name: 'Região Norte', value: Number(dadosDas.Quantidade_de_Trilhas_na_Regiao_Norte), color: '#FFF200' },   
    { name: 'Região Sul', value: Number(dadosDas.Quantidade_de_Trilhas_na_Regiao_Sul), color: '#22B14C' }
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
          <h3>Quantidade de Trilhas</h3>
      
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
            <span>Total De Distancia Percorrida:</span>
            <strong>{dadosDas && dadosDas.Distancia_Total_Percorrida_em_Km} Km</strong>
          </div>
          <div className="stat-item">
            <span>Distancia Percorrida Região Central:</span>
            <strong>{dadosDas && dadosDas.Distancia_Total_na_Regiao_Central_em_Km} Km</strong>
          </div>
          <div className="stat-item">
            <span>Distancia Percorrida Região Leste:</span>
            <strong>{dadosDas && dadosDas.Distancia_Total_na_Regiao_Leste_em_Km} Km</strong>
          </div>
           <div className="stat-item">
            <span>Distancia Percorrida Região Norte:</span>
            <strong>{dadosDas && dadosDas.Distancia_Total_na_Regiao_Norte_em_Km} Km</strong>
          </div>
           <div className="stat-item">
            <span>Distancia Percorrida Região Sul:</span>
            <strong>{dadosDas && dadosDas.Distancia_Total_na_Regiao_Sul_em_Km} Km</strong>
          </div>
        </div>

        
        <div className="activities-card">
          <h3>Atividades recentes</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span>Total de Trilhas Feitas</span>
              {dadosDas && dadosDas.Total_de_Trilhas_Feitas}
            
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
                strokeDasharray={`${percentual()},100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">{percentual()}%</text>
            </svg>
            <span>Trilhas Concluídas</span>
          </div>
          <button className="new-trail-btn"onClick={()=>navegacao("/trilhas")} >Encontrar novas trilhas!</button>
        </div>
      </div>
    </div>
  );
};

export default Grafico;