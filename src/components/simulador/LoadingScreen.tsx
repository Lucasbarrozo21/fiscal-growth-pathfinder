
import { Card, CardContent } from '@/components/ui/card';

const LoadingScreen = () => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Calculando seu score atualizado...</h3>
          <p className="text-gray-600">Analisando o impacto das suas ações</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingScreen;
