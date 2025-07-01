
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TipsFinais = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">💡 Dicas para Aumentar Aprovação</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Aplique em no máximo 2 cartões por vez</li>
              <li>• Mantenha os dados sempre atualizados</li>
              <li>• Continue movimentando a conta regularmente</li>
              <li>• Monitore seu CPF mensalmente</li>
              <li>• Use produtos do banco que você tem relacionamento</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TipsFinais;
