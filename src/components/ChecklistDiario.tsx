
import ChecklistHeader from '@/components/ChecklistHeader';
import DayNavigation from '@/components/DayNavigation';
import TaskList from '@/components/TaskList';
import WeeklyProgress from '@/components/WeeklyProgress';
import { useBusinessLogic } from '@/hooks/useBusinessLogic';

interface ChecklistDiarioProps {
  onComplete: () => void;
}

const ChecklistDiario = ({ onComplete }: ChecklistDiarioProps) => {
  const {
    currentDay,
    completedTasks,
    userProgress,
    dailyTasks,
    toggleTask,
    setCurrentDay,
    getCurrentDayProgress,
    isCurrentDayComplete,
    getAllDaysCompleted
  } = useBusinessLogic();

  const nextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
    }
  };

  const prevDay = () => {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    }
  };

  const getTotalProgress = () => {
    return userProgress.progressoPlano;
  };

  return (
    <div className="space-y-6">
      <ChecklistHeader totalProgress={getTotalProgress()} />
      
      <DayNavigation 
        currentDay={currentDay}
        currentDayProgress={getCurrentDayProgress()}
        onPrevDay={prevDay}
        onNextDay={nextDay}
      />
      
      <TaskList
        currentDay={currentDay}
        tasks={dailyTasks[currentDay as keyof typeof dailyTasks]}
        completedTasks={completedTasks}
        onTaskToggle={toggleTask}
        isCurrentDayComplete={isCurrentDayComplete()}
        allDaysCompleted={getAllDaysCompleted()}
        onComplete={onComplete}
      />
      
      <WeeklyProgress 
        currentDay={currentDay}
        dailyTasks={dailyTasks}
        completedTasks={completedTasks}
      />
    </div>
  );
};

export default ChecklistDiario;
