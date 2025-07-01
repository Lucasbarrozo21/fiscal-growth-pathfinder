
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormDiagnosticoProps {
  onComplete: () => void;
}

const FormDiagnostico = ({ onComplete }: FormDiagnosticoProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    scoreEstimado: '',
    rendaMensal: '',
    temDividas: '',
    nomeSujo: '',
    temContaBancaria: '',
    bancoNome: '',
    motivoPrincipal: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Diagnóstico realizado com sucesso! 🎯",
      description: "Nossa IA analisou seu perfil e criou um plano personalizado.",
    });

    setLoading(false);
    onComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-8 w-8 text-blue-600 mr-2" />
          <CardTitle className="text-2xl text-blue-700">Diagnóstico Financeiro</CardTitle>
        </div>
        <p className="text-gray-600">
          Vamos analisar sua situação atual para criar um plano personalizado
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Dados Pessoais
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Situação Financeira */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
              Situação Financeira
            </h3>

            <div>
              <Label>Faixa de Score Estimado</Label>
              <Select onValueChange={(value) => handleInputChange('scoreEstimado', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua faixa de score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-300">0 - 300 (Muito Baixo)</SelectItem>
                  <SelectItem value="301-500">301 - 500 (Baixo)</SelectItem>
                  <SelectItem value="501-700">501 - 700 (Regular)</SelectItem>
                  <SelectItem value="701-850">701 - 850 (Bom)</SelectItem>
                  <SelectItem value="851-1000">851 - 1000 (Excelente)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="renda">Renda Mensal</Label>
              <Input
                id="renda"
                type="number"
                value={formData.rendaMensal}
                onChange={(e) => handleInputChange('rendaMensal', e.target.value)}
                placeholder="Ex: 2500"
                required
              />
            </div>

            <div>
              <Label>Você tem dívidas pendentes?</Label>
              <RadioGroup 
                value={formData.temDividas}
                onValueChange={(value) => handleInputChange('temDividas', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="dividas-sim" />
                  <Label htmlFor="dividas-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="dividas-nao" />
                  <Label htmlFor="dividas-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Seu nome está sujo nos órgãos de proteção?</Label>
              <RadioGroup 
                value={formData.nomeSujo}
                onValueChange={(value) => handleInputChange('nomeSujo', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="sujo-sim" />
                  <Label htmlFor="sujo-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="sujo-nao" />
                  <Label htmlFor="sujo-nao">Não</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao-sei" id="sujo-nao-sei" />
                  <Label htmlFor="sujo-nao-sei">Não sei</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label>Você tem conta bancária?</Label>
              <RadioGroup 
                value={formData.temContaBancaria}
                onValueChange={(value) => handleInputChange('temContaBancaria', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sim" id="conta-sim" />
                  <Label htmlFor="conta-sim">Sim</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nao" id="conta-nao" />
                  <Label htmlFor="conta-nao">Não</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.temContaBancaria === 'sim' && (
              <div>
                <Label htmlFor="banco">Nome do Banco Principal</Label>
                <Input
                  id="banco"
                  value={formData.bancoNome}
                  onChange={(e) => handleInputChange('bancoNome', e.target.value)}
                  placeholder="Ex: Banco do Brasil, Itaú, Nubank..."
                />
              </div>
            )}

            <div>
              <Label>Qual seu principal objetivo?</Label>
              <Select onValueChange={(value) => handleInputChange('motivoPrincipal', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="limpar-nome">Limpar meu nome</SelectItem>
                  <SelectItem value="aumentar-score">Aumentar meu score</SelectItem>
                  <SelectItem value="conseguir-cartao">Conseguir cartão de crédito</SelectItem>
                  <SelectItem value="emprestimo">Fazer empréstimo</SelectItem>
                  <SelectItem value="financiamento">Financiamento (casa/carro)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analisando...
              </div>
            ) : (
              <>
                Gerar Plano Personalizado
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormDiagnostico;
