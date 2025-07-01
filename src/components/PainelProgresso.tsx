
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Calendar, 
  Target,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface UserProgress {
  scoreAtual: number;
  scoreSimulado: number;
  faseAtual: string;
  progressoPlano: number;
  diasRestantes: number;
}

interface PainelProgressoProps {
  userProgress: UserProgress;
}

const PainelProgresso = ({ userProgress }: PainelProgressoProps) => {
  const {
    scoreAtual,
    scoreSimulado,
    faseAtual,
    progressoPlano,
    diasRestantes
  } = userProgress;

  const fases = [
    { id: 'diagnostico', nome: 'Diagnóstico', ordem: 1 },
    { id: 'plano', nome: 'Plano', ordem: 2 },
    { id: 'checklist', nome: 'Checklist', ordem: 3 },
    { id: 'simulador', nome: 'Simulador', ordem: 4 }
  ];

  const faseAtualOrdem = fases.find(f => f.id === faseAtual)?.ordem || 1;
  const progressoFases = (faseAtualOrdem / fases.length) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-green-600';
    if (score >= 500) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 700) return 'Bom';
    if (score >= 500) return 'Regular';
    return 'Baixo';
  };

  return (
    <div className="space-y-6">
      {/* Score Atual vs Simulado */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            Score de Crédito
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Score Atual</span>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-lg ${getScoreColor(scoreAtual)}`}>
                  {scoreAtual || '---'}
                </span>
                <Badge variant="outline" className="text-xs">
                  {getScoreLabel(scoreAtual)}
                </Badge>
              </div>
            </div>
            <Progress value={(scoreAtual / 1000) * 100} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Score Projetado</span>
              <div className="flex items-center space-x-2">
                <span className={`font-bold text-lg ${getScoreColor(scoreSimulado)}`}>
                  {scoreSimulado || '---'}
                </span>
                <Badge variant="outline" className="text-xs">
                  {getScoreLabel(scoreSimulado)}
                </Badge>
              </div>
            </div>
            <Progress value={(scoreSimulado / 1000) * 100} className="h-2" />
          </div>

          {scoreSimulado > scoreAtual && (
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 font-medium">
                  Potencial de crescimento: +{scoreSimulado - scoreAtual} pontos
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progresso das Fases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Progresso da Jornada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fase Atual</span>
              <Badge className="bg-purple-100 text-purple-800">
                {fases.find(f => f.id === faseAtual)?.nome || 'Início'}
              </Badge>
            </div>
            <Progress value={progressoFases} className="h-2" />
            <div className="text-xs text-gray-500">
              Etapa {faseAtualOrdem} de {fases.length}
            </div>
          </div>

          <div className="space-y-2">
            {fases.map((fase) => (
              <div key={fase.id} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  fase.ordem <= faseAtualOrdem ? 'bg-purple-600' : 'bg-gray-300'
                }`} />
                <span className={`text-sm ${
                  fase.id === faseAtual ? 'font-medium text-purple-600' : 'text-gray-600'
                }`}>
                  {fase.nome}
                </span>
                {fase.ordem <= faseAtualOrdem && fase.id !== faseAtual && (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status do Plano */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
            Status do Plano
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ações Completadas</span>
              <span className="font-medium">{progressoPlano}%</span>
            </div>
            <Progress value={progressoPlano} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-blue-800">
                {diasRestantes} dias
              </div>
              <div className="text-xs text-blue-600">restantes</div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-medium text-green-800">
                {Math.floor(progressoPlano / 10)} ações
              </div>
              <div className="text-xs text-green-600">concluídas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg text-blue-800">
            <Clock className="h-5 w-5 mr-2" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-700">
            {faseAtual === 'diagnostico' && (
              <p>Complete o diagnóstico para receber seu plano personalizado</p>
            )}
            {faseAtual === 'plano' && (
              <p>Execute as ações do plano para aumentar suas chances de aprovação</p>
            )}
            {faseAtual === 'checklist' && (
              <p>Siga o checklist diário para otimizar seus resultados</p>
            )}
            {faseAtual === 'simulador' && (
              <p>Analise suas opções de crédito e aplique nos apps recomendados</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PainelProgresso;
