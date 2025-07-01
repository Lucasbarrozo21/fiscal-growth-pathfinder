
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DayNavigationProps {
  currentDay: number;
  currentDayProgress: number;
  onPrevDay: () => void;
  onNextDay: () => void;
}

const DayNavigation = ({ 
  currentDay, 
  currentDayProgress, 
  onPrevDay, 
  onNextDay 
}: DayNavigationProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            onClick={onPrevDay} 
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
            onClick={onNextDay} 
            disabled={currentDay === 7}
          >
            Próximo Dia →
          </Button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Progresso do Dia {currentDay}</span>
            <span className="text-sm text-gray-600">
              {currentDayProgress.toFixed(0)}%
            </span>
          </div>
          <Progress value={currentDayProgress} />
        </div>
      </CardContent>
    </Card>
  );
};

export default DayNavigation;
