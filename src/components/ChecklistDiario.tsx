
import { useState, useEffect } from 'react';
import ChecklistHeader from '@/components/ChecklistHeader';
import DayNavigation from '@/components/DayNavigation';
import TaskList from '@/components/TaskList';
import WeeklyProgress from '@/components/WeeklyProgress';

interface ChecklistDiarioProps {
  onComplete: () => void;
}

const ChecklistDiario = ({ onComplete }: ChecklistDiarioProps) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<{[key: string]: boolean}>({});
  const [allDaysCompleted, setAllDaysCompleted] = useState(false);

  const dailyTasks = {
    1: [
      { id: 'day1-pix', task: 'Fazer 1 PIX para qualquer contato', category: 'Movimentação' },
      { id: 'day1-serasa', task: 'Verificar CPF no Serasa gratuitamente', category: 'Monitoramento' },
      { id: 'day1-dados', task: 'Atualizar dados pessoais no banco', category: 'Cadastro' }
    ],
    2: [
      { id: 'day2-compra', task: 'Fazer compra no débito (mín. R$ 10)', category: 'Movimentação' },
      { id: 'day2-spc', task: 'Consultar nome no SPC', category: 'Monitoramento' },
      { id: 'day2-cadastro', task: 'Aderir ao Cadastro Positivo', category: 'Score' }
    ],
    3: [
      { id: 'day3-pix2', task: 'Fazer 2 PIX pequenos', category: 'Movimentação' },
      { id: 'day3-negociar', task: 'Ligar para 1 credor (se houver dívida)', category: 'Negociação' },
      { id: 'day3-renda', task: 'Comprovar renda no banco', category: 'Cadastro' }
    ],
    4: [
      { id: 'day4-deposito', task: 'Fazer depósito na conta', category: 'Movimentação' },
      { id: 'day4-relacionamento', task: 'Usar produtos do banco (app/internet)', category: 'Relacionamento' },
      { id: 'day4-score', task: 'Verificar score atualizado', category: 'Monitoramento' }
    ],
    5: [
      { id: 'day5-cartao', task: 'Solicitar cartão pré-pago', category: 'Crédito' },
      { id: 'day5-pix3', task: 'Fazer 3 PIX ao longo do dia', category: 'Movimentação' },
      { id: 'day5-feirão', task: 'Pesquisar feirões de negociação', category: 'Negociação' }
    ],
    6: [
      { id: 'day6-conta', task: 'Manter conta sempre positiva', category: 'Movimentação' },
      { id: 'day6-relacionamento2', task: 'Usar 2 canais digitais do banco', category: 'Relacionamento' },
      { id: 'day6-documentos', task: 'Organizar documentos financeiros', category: 'Preparação' }
    ],
    7: [
      { id: 'day7-final', task: 'Verificar score final', category: 'Avaliação' },
      { id: 'day7-simulacao', task: 'Simular crédito disponível', category: 'Simulação' },
      { id: 'day7-aplicar', task: 'Preparar documentos para aplicação', category: 'Preparação' }
    ]
  };

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getCurrentDayProgress = () => {
    const currentTasks = dailyTasks[currentDay as keyof typeof dailyTasks];
    const completed = currentTasks.filter(task => completedTasks[task.id]).length;
    return (completed / currentTasks.length) * 100;
  };

  const isCurrentDayComplete = () => {
    const currentTasks = dailyTasks[currentDay as keyof typeof dailyTasks];
    return currentTasks.every(task => completedTasks[task.id]);
  };

  const getTotalProgress = () => {
    let totalTasks = 0;
    let totalCompleted = 0;
    
    Object.values(dailyTasks).forEach(tasks => {
      totalTasks += tasks.length;
      totalCompleted += tasks.filter(task => completedTasks[task.id]).length;
    });
    
    return (totalCompleted / totalTasks) * 100;
  };

  useEffect(() => {
    const totalProgress = getTotalProgress();
    if (totalProgress >= 90) {
      setAllDaysCompleted(true);
    }
  }, [completedTasks]);

  const nextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
    }
  };

  const prevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  return (
    <div className="space-y-6">
      <ChecklistHeader totalProgress={getTotalProgress()} />
      
      <DayNavigation 
        currentDay={currentDay}
        currentDayProgress={getCurrentDayProgress()}
        onPrevDay={prevDay}
        onNextDay={nextDay}
      />
      
      <TaskList
        currentDay={currentDay}
        tasks={dailyTasks[currentDay as keyof typeof dailyTasks]}
        completedTasks={completedTasks}
        onTaskToggle={handleTaskToggle}
        isCurrentDayComplete={isCurrentDayComplete()}
        allDaysCompleted={allDaysCompleted}
        onComplete={onComplete}
      />
      
      <WeeklyProgress 
        currentDay={currentDay}
        dailyTasks={dailyTasks}
        completedTasks={completedTasks}
      />
    </div>
  );
};

export default ChecklistDiario;
