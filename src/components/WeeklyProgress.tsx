
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

interface Task {
  id: string;
  task: string;
  category: string;
}

interface WeeklyProgressProps {
  currentDay: number;
  dailyTasks: {[key: number]: Task[]};
  completedTasks: {[key: string]: boolean};
}

const WeeklyProgress = ({ currentDay, dailyTasks, completedTasks }: WeeklyProgressProps) => {
  return (
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
  );
};

export default WeeklyProgress;
