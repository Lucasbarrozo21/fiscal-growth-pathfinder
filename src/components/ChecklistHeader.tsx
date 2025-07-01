
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';

interface ChecklistHeaderProps {
  totalProgress: number;
}

const ChecklistHeader = ({ totalProgress }: ChecklistHeaderProps) => {
  return (
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
            <span>{totalProgress.toFixed(0)}%</span>
          </div>
          <Progress value={totalProgress} className="bg-purple-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistHeader;
