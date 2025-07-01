
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Target, CheckCircle2, Trophy, ArrowRight } from 'lucide-react';

interface Task {
  id: string;
  task: string;
  category: string;
}

interface TaskListProps {
  currentDay: number;
  tasks: Task[];
  completedTasks: {[key: string]: boolean};
  onTaskToggle: (taskId: string) => void;
  isCurrentDayComplete: boolean;
  allDaysCompleted: boolean;
  onComplete: () => void;
}

const TaskList = ({ 
  currentDay, 
  tasks, 
  completedTasks, 
  onTaskToggle, 
  isCurrentDayComplete,
  allDaysCompleted,
  onComplete 
}: TaskListProps) => {
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-blue-600" />
            Tarefas do Dia {currentDay}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((taskItem) => {
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
                    onCheckedChange={() => onTaskToggle(taskItem.id)}
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

          {isCurrentDayComplete && (
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
    </>
  );
};

export default TaskList;
