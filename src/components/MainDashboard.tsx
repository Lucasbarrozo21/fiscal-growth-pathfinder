
import DashboardHeader from '@/components/DashboardHeader';
import ProgressTimeline from '@/components/ProgressTimeline';
import PhaseContent from '@/components/PhaseContent';
import PainelProgresso from '@/components/PainelProgresso';

interface MainDashboardProps {
  phases: Array<{ id: string; title: string; icon: any }>;
  currentPhase: string;
  getCurrentPhaseIndex: () => number;
  userProgress: any;
  userProfile: any;
  onDiagnosticoComplete: (profileData: any) => void;
  onPlanoComplete: () => void;
  onChecklistComplete: () => void;
  onSimuladorComplete: () => void;
}

const MainDashboard = ({
  phases,
  currentPhase,
  getCurrentPhaseIndex,
  userProgress,
  userProfile,
  onDiagnosticoComplete,
  onPlanoComplete,
  onChecklistComplete,
  onSimuladorComplete
}: MainDashboardProps) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <DashboardHeader currentPhase={currentPhase} phases={phases} />
    
    <ProgressTimeline 
      phases={phases} 
      currentPhase={currentPhase} 
      getCurrentPhaseIndex={getCurrentPhaseIndex} 
    />

    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <PainelProgresso userProgress={userProgress} />
        </div>

        <div className="lg:col-span-2">
          <PhaseContent 
            currentPhase={currentPhase}
            onDiagnosticoComplete={onDiagnosticoComplete}
            onPlanoComplete={onPlanoComplete}
            onChecklistComplete={onChecklistComplete}
            onSimuladorComplete={onSimuladorComplete}
            userProgress={userProgress}
            userProfile={userProfile}
          />
        </div>
      </div>
    </main>
  </div>
);

export default MainDashboard;
