
interface ProgressTimelineProps {
  phases: Array<{ id: string; title: string; icon: any }>;
  currentPhase: string;
  getCurrentPhaseIndex: () => number;
}

const ProgressTimeline = ({ phases, currentPhase, getCurrentPhaseIndex }: ProgressTimelineProps) => (
  <div className="bg-white dark:bg-gray-800 border-b">
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
                  'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'}
              `}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`ml-2 text-sm font-medium ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 
                isCompleted ? 'text-green-600 dark:text-green-400' : 
                'text-gray-400 dark:text-gray-500'
              }`}>
                {phase.title}
              </span>
              {index < phases.slice(1).length - 1 && (
                <div className={`h-0.5 w-16 mx-4 ${
                  isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

export default ProgressTimeline;
