
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2,
  Clock,
  ArrowRight,
  Brain
} from 'lucide-react';

interface PlanoDeAcaoProps {
  onComplete: () => void;
}

const PlanoDeAcao = ({ onComplete }: PlanoDeAcaoProps) => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [showAIInsight, setShowAIInsight] = useState(false);

  const planoAcoes = {
    impacto_score: [
      {
        id: 'cadastro-positivo',
        titulo: 'Aderir ao Cadastro Positivo',
        descricao: 'Registre-se no Cadastro Positivo do Banco Central para mostrar seu histórico de bom pagador',
        impacto: 'Alto',
        prazo: '1 dia',
        categoria: 'score'
      },
      {
        id: 'atualizar-dados',
        titulo: 'Atualizar dados no Serasa/SPC',
        descricao: 'Mantenha seus dados pessoais sempre atualizados nos órgãos de proteção',
        impacto: 'Médio',
        prazo: '1 dia',
        categoria: 'score'
      },
      {
        id: 'relacionamento-banco',
        titulo: 'Fortalecer relacionamento bancário',
        descricao: 'Concentre movimentação em um banco principal por pelo menos 3 meses',
        impacto: 'Alto',
        prazo: '7 dias',
        categoria: 'score'
      }
    ],
    movimentacao: [
      {
        id: 'pix-diario',
        titulo: 'Realizar PIX diariamente',
        descricao: 'Faça pelo menos 1 PIX por dia para mostrar atividade bancária',
        impacto: 'Médio',
        prazo: '7 dias',
        categoria: 'movimentacao'
      },
      {
        id: 'manter-saldo',
        titulo: 'Manter saldo positivo',
        descricao: 'Evite ficar no vermelho, mesmo que seja um valor baixo',
        impacto: 'Alto',
        prazo: '7 dias',
        categoria: 'movimentacao'
      },
      {
        id: 'compras-cartao',
        titulo: 'Usar cartão de débito',
        descricao: 'Faça compras pequenas no cartão de débito para gerar histórico',
        impacto: 'Médio',
        prazo: '7 dias',
        categoria: 'movimentacao'
      }
    ],
    negociacao: [
      {
        id: 'negociar-dividas',
        titulo: 'Negociar dívidas em atraso',
        descricao: 'Entre em contato com credores para renegociar dívidas pendentes',
        impacto: 'Muito Alto',
        prazo: '3 dias',
        categoria: 'negociacao'
      },
      {
        id: 'feiroes-limpa-nome',
        titulo: 'Participar de feirões',
        descricao: 'Aproveite feirões de negociação para quitar dívidas com desconto',
        impacto: 'Alto',
        prazo: '5 dias',
        categoria: 'negociacao'
      }
    ]
  };

  const allActions = [
    ...planoAcoes.impacto_score,
    ...planoAcoes.movimentacao,
    ...planoAcoes.negociacao
  ];

  const completionPercentage = (completedActions.length / allActions.length) * 100;

  const handleActionToggle = (actionId: string) => {
    setCompletedActions(prev => {
      if (prev.includes(actionId)) {
        return prev.filter(id => id !== actionId);
      } else {
        const newCompleted = [...prev, actionId];
        if (newCompleted.length === Math.floor(allActions.length * 0.8)) {
          setShowAIInsight(true);
        }
        return newCompleted;
      }
    });
  };

  const getImpactColor = (impacto: string) => {
    switch (impacto) {
      case 'Muito Alto': return 'bg-red-100 text-red-800 border-red-200';
      case 'Alto': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Médio': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (categoria: string) => {
    switch (categoria) {
      case 'score': return TrendingUp;
      case 'movimentacao': return DollarSign;
      case 'negociacao': return Target;
      default: return CheckCircle2;
    }
  };

  const renderActionCategory = (title: string, actions: any[], icon: any) => {
    const Icon = icon;
    const categoryCompleted = actions.filter(action => completedActions.includes(action.id)).length;
    
    return (
      <Card key={title} className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Icon className="h-5 w-5 mr-2 text-blue-600" />
            {title}
            <Badge variant="outline" className="ml-auto">
              {categoryCompleted}/{actions.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {actions.map((action) => {
            const isCompleted = completedActions.includes(action.id);
            return (
              <div 
                key={action.id}
                className={`p-4 border rounded-lg transition-all ${
                  isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => handleActionToggle(action.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-medium ${isCompleted ? 'line-through text-green-700' : 'text-gray-900'}`}>
                        {action.titulo}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getImpactColor(action.impacto)}>
                          {action.impacto}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {action.prazo}
                        </Badge>
                      </div>
                    </div>
                    <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                      {action.descricao}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header com progresso */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Seu Plano de Ação</h2>
              <p className="text-blue-100">
                Complete as ações abaixo para aumentar suas chances de aprovação
              </p>
            </div>
            <Target className="h-12 w-12 text-blue-100" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso geral</span>
              <span>{completedActions.length}/{allActions.length} ações</span>
            </div>
            <Progress value={completionPercentage} className="bg-blue-500" />
            <p className="text-xs text-blue-100">
              Complete 80% das ações para avançar para o próximo passo
            </p>
          </div>
        </CardContent>
      </Card>

      {/* IA Insight */}
      {showAIInsight && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Brain className="h-6 w-6 text-blue-600 mt-1" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">💡 Insight da IA</h3>
                <p className="text-blue-800 text-sm">
                  Parabéns! Você completou {completionPercentage.toFixed(0)}% do plano. 
                  Com base no seu progresso, suas chances de aprovação aumentaram significativamente. 
                  Continue seguindo as ações diárias para melhores resultados!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categorias de ações */}
      {renderActionCategory('🎯 Ações para Impacto no Score', planoAcoes.impacto_score, TrendingUp)}
      {renderActionCategory('💰 Movimentação Bancária', planoAcoes.movimentacao, DollarSign)}
      {renderActionCategory('🤝 Negociação Estratégica', planoAcoes.negociacao, Target)}

      {/* Botão para avançar */}
      {completionPercentage >= 80 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Excelente trabalho! 🎉
            </h3>
            <p className="text-green-700 mb-4">
              Você completou a maior parte do plano. Agora vamos para as ações diárias!
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Iniciar Checklist Diário
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlanoDeAcao;
