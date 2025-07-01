
import FormDiagnostico from '@/components/FormDiagnostico';
import PlanoDeAcao from '@/components/PlanoDeAcao';
import ChecklistDiario from '@/components/ChecklistDiario';
import SimuladorCredito from '@/components/SimuladorCredito';
import ResumoJornada from '@/components/ResumoJornada';

interface PhaseContentProps {
  currentPhase: string;
  onDiagnosticoComplete: (profileData: any) => void;
  onPlanoComplete: () => void;
  onChecklistComplete: () => void;
  onSimuladorComplete: () => void;
  userProgress: any;
  userProfile: any;
}

const PhaseContent = ({ 
  currentPhase, 
  onDiagnosticoComplete, 
  onPlanoComplete, 
  onChecklistComplete, 
  onSimuladorComplete,
  userProgress,
  userProfile 
}: PhaseContentProps) => {
  switch (currentPhase) {
    case 'diagnostico':
      return <FormDiagnostico onComplete={onDiagnosticoComplete} />;
    case 'plano':
      return <PlanoDeAcao onComplete={onPlanoComplete} />;
    case 'checklist':
      return <ChecklistDiario onComplete={onChecklistComplete} />;
    case 'simulador':
      return <SimuladorCredito onComplete={onSimuladorComplete} />;
    case 'resumo':
      return <ResumoJornada userProgress={userProgress} userProfile={userProfile} />;
    default:
      return null;
  }
};

export default PhaseContent;
