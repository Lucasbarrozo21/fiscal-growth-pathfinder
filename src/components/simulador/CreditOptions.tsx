
import { Smartphone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CreditOption {
  nome: string;
  tipo: string;
  limite: string;
  taxa: string;
  aprovacao: string;
  tempo: string;
  icone: string;
  link: string;
}

interface CreditOptionsProps {
  statusSemaforo: 'vermelho' | 'amarelo' | 'verde';
}

const CreditOptions = ({ statusSemaforo }: CreditOptionsProps) => {
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

  return (
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
  );
};

export default CreditOptions;
