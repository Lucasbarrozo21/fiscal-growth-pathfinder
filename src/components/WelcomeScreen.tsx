
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain,
  Target,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => (
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
        onClick={onStart}
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

export default WelcomeScreen;
