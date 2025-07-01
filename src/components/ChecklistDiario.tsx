
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trophy,
  Target,
  Zap
} from 'lucide-react';

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

  const getCategoryColor = (category: string) => {
    const colors = {
      'Movimentação': 'bg-blue-100 text-blue-800',
      'Monitoramento': 'bg-green-100 text-green-800',
      'Cadastro': 'bg-purple-100 text-purple-800',
      'Score': 'bg-orange-100 text-orange-800',
      'Negociação': 'bg-red-100 text-red-800',
      'Relacionamento': 'bg-indigo-100 text-indigo-800',
      'Crédito': 'bg-yellow-100 text-yellow-800',
      'Preparação': 'bg-gray-100 text-gray-800',
      'Avaliação': 'bg-green-100 text-green-800',
      'Simulação': 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Checklist de 7 Dias</h2>
              <p className="text-purple-100">
                Siga as ações diárias para maximizar seus resultados
              </p>
            </div>
            <Calendar className="h-12 w-12 text-purple-100" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso total</span>
              <span>{getTotalProgress().toFixed(0)}%</span>
            </div>
            <Progress value={getTotalProgress()} className="bg-purple-500" />
          </div>
        </CardContent>
      </Card>

      {/* Navegação de dias */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="outline" 
              onClick={prevDay} 
              disabled={currentDay === 1}
            >
              ← Dia Anterior
            </Button>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600">Dia {currentDay}</h3>
              <p className="text-gray-600">de 7 dias</p>
            </div>
            
            <Button 
              variant="outline" 
              onClick={nextDay} 
              disabled={currentDay === 7}
            >
              Próximo Dia →
            </Button>
          </div>

          {/* Progresso do dia atual */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Progresso do Dia {currentDay}</span>
              <span className="text-sm text-gray-600">
                {getCurrentDayProgress().toFixed(0)}%
              </span>
            </div>
            <Progress value={getCurrentDayProgress()} />
          </div>
        </CardContent>
      </Card>

      {/* Tarefas do dia */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Tarefas do Dia {currentDay}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {dailyTasks[currentDay as keyof typeof dailyTasks].map((taskItem, index) => {
            const isCompleted = completedTasks[taskItem.id];
            return (
              <div 
                key={taskItem.id}
                className={`p-4 border rounded-lg transition-all ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => handleTaskToggle(taskItem.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium ${
                        isCompleted ? 'line-through text-green-700' : 'text-gray-900'
                      }`}>
                        {taskItem.task}
                      </h4>
                      <Badge className={getCategoryColor(taskItem.category)}>
                        {taskItem.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Feedback do dia */}
          {isCurrentDayComplete() && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">
                  Dia {currentDay} completo! 🎉
                </span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Excelente! Continue assim para maximizar seus resultados.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline dos dias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-600" />
            Progresso Semanal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(day => {
              const dayTasks = dailyTasks[day as keyof typeof dailyTasks];
              const dayCompleted = dayTasks.filter(task => completedTasks[task.id]).length;
              const dayProgress = (dayCompleted / dayTasks.length) * 100;
              const isCurrentDay = day === currentDay;
              
              return (
                <div 
                  key={day}
                  className={`p-3 text-center rounded-lg border ${
                    isCurrentDay ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">Dia {day}</div>
                  <div className={`text-xs ${
                    dayProgress === 100 ? 'text-green-600' : 
                    dayProgress > 0 ? 'text-blue-600' : 'text-gray-400'
                  }`}>
                    {dayCompleted}/{dayTasks.length}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className={`h-1 rounded-full ${
                        dayProgress === 100 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${dayProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Botão final */}
      {allDaysCompleted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Parabéns! Jornada Concluída! 🏆
            </h3>
            <p className="text-green-700 mb-4">
              Você completou todos os passos. Agora vamos simular seu crédito disponível!
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Ver Simulação de Crédito
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChecklistDiario;
