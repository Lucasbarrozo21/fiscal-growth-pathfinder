import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign,
  TrendingUp,
  CreditCard,
  Smartphone,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Star
} from 'lucide-react';

interface SimuladorCreditoProps {
  onComplete: () => void;
}

const SimuladorCredito = ({ onComplete }: SimuladorCreditoProps) => {
  const [scoreSimulado, setScoreSimulado] = useState(0);
  const [statusSemaforo, setStatusSemaforo] = useState<'vermelho' | 'amarelo' | 'verde'>('vermelho');
  const [loading, setLoading] = useState(true);

  const creditOptions = {
    verde: [
      {
        nome: 'Nubank',
        tipo: 'Cartão de Crédito',
        limite: 'R$ 500 - R$ 2.000',
        taxa: '13,75% a.m.',
        aprovacao: '85%',
        tempo: '24h',
        icone: '💜',
        link: 'https://nubank.com.br'
      },
      {
        nome: 'Inter',
        tipo: 'Conta + Cartão',
        limite: 'R$ 300 - R$ 1.500',
        taxa: '8,99% a.m.',
        aprovacao: '80%',
        tempo: '2h',
        icone: '🧡',
        link: 'https://bancointer.com.br'
      },
      {
        nome: 'C6 Bank',
        tipo: 'Cartão Black',
        limite: 'R$ 1.000 - R$ 5.000',
        taxa: '11,99% a.m.',
        aprovacao: '75%',
        tempo: '1h',
        icone: '🖤',
        link: 'https://c6bank.com.br'
      }
    ],
    amarelo: [
      {
        nome: 'Pic Pay',
        tipo: 'Cartão Pré-pago',
        limite: 'R$ 50 - R$ 500',
        taxa: 'Sem juros',
        aprovacao: '95%',
        tempo: '15min',
        icone: '💚',
        link: 'https://picpay.com'
      },
      {
        nome: 'Mercado Pago',
        tipo: 'Cartão + Empréstimo',
        limite: 'R$ 100 - R$ 800',
        taxa: '6,99% a.m.',
        aprovacao: '90%',
        tempo: '30min',
        icone: '💛',
        link: 'https://mercadopago.com.br'
      }
    ],
    vermelho: [
      {
        nome: 'RecargaPay',
        tipo: 'Cartão Pré-pago',
        limite: 'R$ 20 - R$ 200',
        taxa: 'Sem juros',
        aprovacao: '98%',
        tempo: '5min',
        icone: '🔵',
        link: 'https://recargapay.com.br'
      }
    ]
  };

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

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium mb-2">Calculando seu score atualizado...</h3>
            <p className="text-gray-600">Analisando o impacto das suas ações</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Atualizado */}
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

      {/* Status Semáforo */}
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

      {/* Opções de Crédito */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-green-600" />
            Apps Recomendados para Você
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {creditOptions[statusSemaforo].map((option, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{option.icone}</div>
                    <div>
                      <h4 className="font-semibold text-lg">{option.nome}</h4>
                      <p className="text-gray-600 text-sm">{option.tipo}</p>
                    </div>
                  </div>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => window.open(option.link, '_blank')}
                  >
                    Aplicar Agora
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div>
                    <div className="text-gray-500">Limite</div>
                    <div className="font-medium">{option.limite}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Taxa</div>
                    <div className="font-medium">{option.taxa}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Aprovação</div>
                    <div className="font-medium text-green-600">{option.aprovacao}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Resposta</div>
                    <div className="font-medium">{option.tempo}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas Finais */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-medium text-blue-900 mb-2">💡 Dicas para Aumentar Aprovação</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Aplique em no máximo 2 cartões por vez</li>
                <li>• Mantenha os dados sempre atualizados</li>
                <li>• Continue movimentando a conta regularmente</li>
                <li>• Monitore seu CPF mensalmente</li>
                <li>• Use produtos do banco que você tem relacionamento</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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
