
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  CheckCircle, 
  Calendar,
  Target,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumoJornadaProps {
  userProgress: any;
  userProfile: any;
}

const ResumoJornada = ({ userProgress, userProfile }: ResumoJornadaProps) => {
  const { toast } = useToast();
  const [generatingPDF, setGeneratingPDF] = useState(false);

  const handleGeneratePDF = async () => {
    setGeneratingPDF(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Relatório PDF gerado! 📄",
      description: "Seu relatório personalizado foi criado com sucesso.",
    });
    
    setGeneratingPDF(false);
  };

  const calculateJornadaProgress = () => {
    const totalDays = 7;
    const completedDays = userProgress?.diasCompletos || 0;
    return Math.round((completedDays / totalDays) * 100);
  };

  const getScoreImprovement = () => {
    const scoreInicial = userProfile?.scoreAtual || 300;
    const scoreAtual = userProgress?.scoreAtual || scoreInicial;
    return scoreAtual - scoreInicial;
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-blue-600 mr-2" />
          <CardTitle className="text-2xl text-blue-700">Resumo da Jornada</CardTitle>
        </div>
        <p className="text-gray-600">
          Sua evolução financeira nos últimos 7 dias
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Progresso Geral</p>
              <p className="text-2xl font-bold text-green-600">
                {calculateJornadaProgress()}%
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Melhoria do Score</p>
              <p className="text-2xl font-bold text-blue-600">
                +{getScoreImprovement()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Tarefas Concluídas</p>
              <p className="text-2xl font-bold text-purple-600">
                {userProgress?.tarefasConcluidas || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Progresso Semanal
          </h3>
          <Progress value={calculateJornadaProgress()} className="mb-2" />
          <p className="text-sm text-gray-600">
            {userProgress?.diasCompletos || 0} de 7 dias completos
          </p>
        </div>

        {/* Key Achievements */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Principais Conquistas
          </h3>
          <div className="space-y-2">
            {userProgress?.conquistas?.map((conquista: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{conquista}</span>
              </div>
            ))}
            {(!userProgress?.conquistas || userProgress.conquistas.length === 0) && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Diagnóstico financeiro completo</span>
              </div>
            )}
          </div>
        </div>

        {/* Profile Summary */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Resumo do Perfil
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Score Atual</p>
              <p className="font-medium">{userProgress?.scoreAtual || userProfile?.scoreAtual}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Situação</p>
              <Badge variant={userProfile?.temDividas ? "destructive" : "secondary"}>
                {userProfile?.temDividas ? "Com Dívidas" : "Sem Dívidas"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Relacionamento Bancário</p>
              <p className="font-medium">{userProfile?.relacionamentoBanco || "Não informado"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Movimentação</p>
              <p className="font-medium">{userProfile?.movimentacaoMensal || "Média"}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button 
            onClick={handleGeneratePDF}
            disabled={generatingPDF}
            className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            {generatingPDF ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Gerando PDF...
              </div>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Baixar Relatório PDF
              </>
            )}
          </Button>
          
          <Button variant="outline" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Continuar Jornada
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumoJornada;
