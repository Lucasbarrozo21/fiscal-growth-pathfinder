
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import ScoreDisplay from './simulador/ScoreDisplay';
import SemaforoStatus from './simulador/SemaforoStatus';
import CreditOptions from './simulador/CreditOptions';
import TipsFinais from './simulador/TipsFinais';
import LoadingScreen from './simulador/LoadingScreen';

interface SimuladorCreditoProps {
  onComplete: () => void;
}

const SimuladorCredito = ({ onComplete }: SimuladorCreditoProps) => {
  const [scoreSimulado, setScoreSimulado] = useState(0);
  const [statusSemaforo, setStatusSemaforo] = useState<'vermelho' | 'amarelo' | 'verde'>('vermelho');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula o cálculo do score
    const timer = setTimeout(() => {
      const novoScore = Math.floor(Math.random() * 300) + 400; // Score entre 400-700
      setScoreSimulado(novoScore);
      
      if (novoScore >= 650) {
        setStatusSemaforo('verde');
      } else if (novoScore >= 500) {
        setStatusSemaforo('amarelo');
      } else {
        setStatusSemaforo('vermelho');
      }
      
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <ScoreDisplay scoreSimulado={scoreSimulado} />
      <SemaforoStatus statusSemaforo={statusSemaforo} />
      <CreditOptions statusSemaforo={statusSemaforo} />
      <TipsFinais />

      {/* Botão de Ação */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold mb-2">Pronto para o próximo nível?</h3>
          <p className="text-green-100 mb-4">
            Continue monitorando seu progresso e aplicando essas estratégias
          </p>
          <Button 
            variant="secondary"
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={onComplete}
          >
            <DollarSign className="mr-2 h-5 w-5" />
            Finalizar Simulação
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimuladorCredito;
