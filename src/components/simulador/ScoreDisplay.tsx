
import { TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  scoreSimulado: number;
}

const ScoreDisplay = ({ scoreSimulado }: ScoreDisplayProps) => {
  return (
    <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Seu Score Atualizado</h2>
          <div className="text-6xl font-bold mb-4">{scoreSimulado}</div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5" />
            <span>Baseado nas suas ações dos últimos 7 dias</span>
          </div>
          <Progress value={(scoreSimulado / 1000) * 100} className="bg-blue-500" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreDisplay;
