
import { CheckCircle2, CreditCard, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SemaforoStatusProps {
  statusSemaforo: 'vermelho' | 'amarelo' | 'verde';
}

const SemaforoStatus = ({ statusSemaforo }: SemaforoStatusProps) => {
  const getSemaforoColor = () => {
    switch (statusSemaforo) {
      case 'verde': return 'text-green-600 bg-green-50 border-green-200';
      case 'amarelo': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'vermelho': return 'text-red-600 bg-red-50 border-red-200';
    }
  };

  const getSemaforoIcon = () => {
    switch (statusSemaforo) {
      case 'verde': return '🟢';
      case 'amarelo': return '🟡';
      case 'vermelho': return '🔴';
    }
  };

  const getSemaforoMessage = () => {
    switch (statusSemaforo) {
      case 'verde': 
        return {
          title: 'Excelente! Status Verde 🎉',
          message: 'Suas chances de aprovação são altas. Recomendamos aplicar nos cartões abaixo.'
        };
      case 'amarelo':
        return {
          title: 'Bom progresso! Status Amarelo ⚡',
          message: 'Você está no caminho certo. Foque em cartões pré-pagos e produtos básicos.'
        };
      case 'vermelho':
        return {
          title: 'Início da jornada - Status Vermelho 🚀',
          message: 'Comece com produtos sem análise de crédito para construir seu histórico.'
        };
    }
  };

  return (
    <Card className={`border-2 ${getSemaforoColor()}`}>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="text-6xl mb-4">{getSemaforoIcon()}</div>
          <h3 className="text-xl font-bold mb-2">{getSemaforoMessage().title}</h3>
          <p className="text-gray-700">{getSemaforoMessage().message}</p>
          
          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="text-center">
              <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="font-medium">Histórico Melhorado</div>
              <div className="text-gray-600">Movimentação ativa</div>
            </div>
            <div className="text-center">
              <CreditCard className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="font-medium">Relacionamento</div>
              <div className="text-gray-600">Banco fortalecido</div>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="font-medium">Score Crescendo</div>
              <div className="text-gray-600">Tendência positiva</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SemaforoStatus;
