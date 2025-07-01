
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

interface DashboardHeaderProps {
  currentPhase: string;
  phases: Array<{ id: string; title: string; icon: any }>;
}

const DashboardHeader = ({ currentPhase, phases }: DashboardHeaderProps) => (
  <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
    <div className="max-w-6xl mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            BoostCrédito AI™
          </h1>
          <Badge variant="outline" className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700">
            Fase: {phases.find(p => p.id === currentPhase)?.title}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Sair
          </Button>
        </div>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
