
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Target,
  DollarSign,
  Shield,
  Brain,
  ChevronRight
} from 'lucide-react';
import FormDiagnostico from '@/components/FormDiagnostico';
import PlanoDeAcao from '@/components/PlanoDeAcao';
import ChecklistDiario from '@/components/ChecklistDiario';
import SimuladorCredito from '@/components/SimuladorCredito';
import PainelProgresso from '@/components/PainelProgresso';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [user, setUser] = useState(null);
  const [currentPhase, setCurrentPhase] = useState('welcome');
  const [userProgress, setUserProgress] = useState({
    scoreAtual: 0,
    scoreSimulado: 0,
    faseAtual: 'diagnostico',
    progressoPlano: 0,
    diasRestantes: 7
  });

  const phases = [
    { id: 'welcome', title: 'Bem-vindo', icon: Shield },
    { id: 'diagnostico', title: 'Diagnóstico', icon: Brain },
    { id: 'plano', title: 'Plano de Ação', icon: Target },
    { id: 'checklist', title: 'Checklist Diário', icon: CheckCircle },
    { id: 'simulador', title: 'Simulador', icon: DollarSign }
  ];

  const getCurrentPhaseIndex = () => {
    return phases.findIndex(phase => phase.id === currentPhase);
  };

  const WelcomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            BoostCrédito AI™
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sua jornada personalizada para recuperação financeira e liberação de crédito, 
            com inteligência artificial e plano de 7 dias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-green-700">Diagnóstico IA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Análise inteligente do seu perfil financeiro com recomendações personalizadas
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-blue-700">Plano Progressivo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ações diárias estratégicas para aumentar seu score e liberar crédito
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-purple-700">Resultados Reais</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Simulação de crédito disponível e indicação dos melhores apps
              </p>
            </CardContent>
          </Card>
        </div>

        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
          onClick={() => setCurrentPhase('diagnostico')}
        >
          Começar Diagnóstico
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

        <p className="text-sm text-gray-500 mt-4">
          ✨ Gratuito • 7 dias • Sem compromisso
        </p>
      </div>
    </div>
  );

  const MainDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                BoostCrédito AI™
              </h1>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Fase: {phases.find(p => p.id === currentPhase)?.title}
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Timeline */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {phases.slice(1).map((phase, index) => {
              const isActive = phase.id === currentPhase;
              const isCompleted = index < getCurrentPhaseIndex() - 1;
              const Icon = phase.icon;
              
              return (
                <div key={phase.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 
                    ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 
                      isCompleted ? 'bg-green-600 border-green-600 text-white' : 
                      'bg-gray-100 border-gray-300 text-gray-400'}
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {phase.title}
                  </span>
                  {index < phases.slice(1).length - 1 && (
                    <div className={`h-0.5 w-16 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Progress Panel */}
          <div className="lg:col-span-1">
            <PainelProgresso userProgress={userProgress} />
          </div>

          {/* Right Column - Current Phase Content */}
          <div className="lg:col-span-2">
            {currentPhase === 'diagnostico' && (
              <FormDiagnostico onComplete={() => setCurrentPhase('plano')} />
            )}
            {currentPhase === 'plano' && (
              <PlanoDeAcao onComplete={() => setCurrentPhase('checklist')} />
            )}
            {currentPhase === 'checklist' && (
              <ChecklistDiario onComplete={() => setCurrentPhase('simulador')} />
            )}
            {currentPhase === 'simulador' && (
              <SimuladorCredito />
            )}
          </div>
        </div>
      </main>
    </div>
  );

  if (currentPhase === 'welcome') {
    return <WelcomeScreen />;
  }

  return <MainDashboard />;
};

export default Index;
