
import { 
  TrendingUp, 
  CheckCircle, 
  Target,
  DollarSign,
  Shield,
  Brain
} from 'lucide-react';
import WelcomeScreen from '@/components/WelcomeScreen';
import MainDashboard from '@/components/MainDashboard';
import { useBusinessLogic } from '@/hooks/useBusinessLogic';
import { useNotifications } from '@/hooks/useNotifications';

const Index = () => {
  const {
    currentPhase,
    userProgress,
    userProfile,
    setCurrentPhase,
    setUserProfile
  } = useBusinessLogic();

  const { scheduleDailyReminder, scheduleScoreCheckReminder } = useNotifications();

  const phases = [
    { id: 'welcome', title: 'Bem-vindo', icon: Shield },
    { id: 'diagnostico', title: 'Diagnóstico', icon: Brain },
    { id: 'plano', title: 'Plano de Ação', icon: Target },
    { id: 'checklist', title: 'Checklist Diário', icon: CheckCircle },
    { id: 'simulador', title: 'Simulador', icon: DollarSign },
    { id: 'resumo', title: 'Resumo', icon: TrendingUp }
  ];

  const getCurrentPhaseIndex = () => {
    return phases.findIndex(phase => phase.id === currentPhase);
  };

  const handleDiagnosticoComplete = (profileData: any) => {
    setUserProfile(profileData);
    setCurrentPhase('plano');
    scheduleDailyReminder();
    scheduleScoreCheckReminder();
  };

  if (currentPhase === 'welcome') {
    return <WelcomeScreen onStart={() => setCurrentPhase('diagnostico')} />;
  }

  return (
    <MainDashboard
      phases={phases}
      currentPhase={currentPhase}
      getCurrentPhaseIndex={getCurrentPhaseIndex}
      userProgress={userProgress}
      userProfile={userProfile}
      onDiagnosticoComplete={handleDiagnosticoComplete}
      onPlanoComplete={() => setCurrentPhase('checklist')}
      onChecklistComplete={() => setCurrentPhase('simulador')}
      onSimuladorComplete={() => setCurrentPhase('resumo')}
    />
  );
};

export default Index;
