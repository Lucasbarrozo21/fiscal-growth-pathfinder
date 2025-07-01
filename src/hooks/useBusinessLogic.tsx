
import { useState, useEffect, useCallback } from 'react';

interface Task {
  id: string;
  task: string;
  category: string;
}

interface UserProfile {
  scoreAtual: number;
  temDividas: boolean;
  rendaComprovada: boolean;
  relacionamentoBanco: 'novo' | 'existente' | 'longo';
  movimentacaoMensal: 'baixa' | 'media' | 'alta';
}

interface BusinessLogicState {
  currentDay: number;
  completedTasks: {[key: string]: boolean};
  userProgress: {
    scoreAtual: number;
    scoreSimulado: number;
    faseAtual: string;
    progressoPlano: number;
    diasRestantes: number;
  };
  currentPhase: string;
  userProfile: UserProfile | null;
}

export const useBusinessLogic = () => {
  const [state, setState] = useState<BusinessLogicState>({
    currentDay: 1,
    completedTasks: {},
    userProgress: {
      scoreAtual: 0,
      scoreSimulado: 0,
      faseAtual: 'diagnostico',
      progressoPlano: 0,
      diasRestantes: 7
    },
    currentPhase: 'welcome',
    userProfile: null
  });

  const dailyTasks = {
    1: [
      { id: 'day1-pix', task: 'Fazer 1 PIX para qualquer contato', category: 'Movimentação' },
      { id: 'day1-serasa', task: 'Verificar CPF no Serasa gratuitamente', category: 'Monitoramento' },
      { id: 'day1-dados', task: 'Atualizar dados pessoais no banco', category: 'Cadastro' }
    ],
    2: [
      { id: 'day2-compra', task: 'Fazer compra no débito (mín. R$ 10)', category: 'Movimentação' },
      { id: 'day2-spc', task: 'Consultar nome no SPC', category: 'Monitoramento' },
      { id: 'day2-cadastro', task: 'Aderir ao Cadastro Positivo', category: 'Score' }
    ],
    3: [
      { id: 'day3-pix2', task: 'Fazer 2 PIX pequenos', category: 'Movimentação' },
      { id: 'day3-negociar', task: 'Ligar para 1 credor (se houver dívida)', category: 'Negociação' },
      { id: 'day3-renda', task: 'Comprovar renda no banco', category: 'Cadastro' }
    ],
    4: [
      { id: 'day4-deposito', task: 'Fazer depósito na conta', category: 'Movimentação' },
      { id: 'day4-relacionamento', task: 'Usar produtos do banco (app/internet)', category: 'Relacionamento' },
      { id: 'day4-score', task: 'Verificar score atualizado', category: 'Monitoramento' }
    ],
    5: [
      { id: 'day5-cartao', task: 'Solicitar cartão pré-pago', category: 'Crédito' },
      { id: 'day5-pix3', task: 'Fazer 3 PIX ao longo do dia', category: 'Movimentação' },
      { id: 'day5-feirão', task: 'Pesquisar feirões de negociação', category: 'Negociação' }
    ],
    6: [
      { id: 'day6-conta', task: 'Manter conta sempre positiva', category: 'Movimentação' },
      { id: 'day6-relacionamento2', task: 'Usar 2 canais digitais do banco', category: 'Relacionamento' },
      { id: 'day6-documentos', task: 'Organizar documentos financeiros', category: 'Preparação' }
    ],
    7: [
      { id: 'day7-final', task: 'Verificar score final', category: 'Avaliação' },
      { id: 'day7-simulacao', task: 'Simular crédito disponível', category: 'Simulação' },
      { id: 'day7-aplicar', task: 'Preparar documentos para aplicação', category: 'Preparação' }
    ]
  };

  // Algoritmo de cálculo de score
  const calculateScore = useCallback((profile: UserProfile, completedTasks: {[key: string]: boolean}) => {
    if (!profile) return 0;

    let baseScore = profile.scoreAtual || 300;
    let bonus = 0;

    // Bônus por categoria de ação
    Object.entries(completedTasks).forEach(([taskId, completed]) => {
      if (!completed) return;

      const task = Object.values(dailyTasks).flat().find(t => t.id === taskId);
      if (!task) return;

      switch (task.category) {
        case 'Movimentação': bonus += 15; break;
        case 'Monitoramento': bonus += 10; break;
        case 'Score': bonus += 20; break;
        case 'Cadastro': bonus += 12; break;
        case 'Relacionamento': bonus += 18; break;
        case 'Negociação': bonus += 25; break;
        case 'Crédito': bonus += 22; break;
        default: bonus += 8; break;
      }
    });

    // Multiplicadores baseado no perfil
    let multiplier = 1;
    if (profile.relacionamentoBanco === 'longo') multiplier += 0.2;
    if (profile.rendaComprovada) multiplier += 0.15;
    if (profile.movimentacaoMensal === 'alta') multiplier += 0.1;
    if (!profile.temDividas) multiplier += 0.25;

    const simulatedScore = Math.min(950, baseScore + (bonus * multiplier));
    return Math.round(simulatedScore);
  }, [dailyTasks]);

  // Geração inteligente do plano baseado no perfil
  const generatePlan = useCallback((profile: UserProfile) => {
    const priorities = [];

    if (profile.temDividas) {
      priorities.push('Negociação de dívidas é prioridade');
      priorities.push('Foque nos dias 3 e 5 para ações de negociação');
    }

    if (!profile.rendaComprovada) {
      priorities.push('Comprove sua renda até o dia 3');
      priorities.push('Atualize dados no banco no dia 1');
    }

    if (profile.relacionamentoBanco === 'novo') {
      priorities.push('Fortaleça relacionamento bancário nos dias 4 e 6');
      priorities.push('Use produtos digitais do banco diariamente');
    }

    if (profile.movimentacaoMensal === 'baixa') {
      priorities.push('Aumente movimentação com PIX nos dias 1, 3 e 5');
      priorities.push('Mantenha conta sempre positiva');
    }

    return {
      prioridades: priorities,
      scoreProjetado: calculateScore(profile, {}),
      tempoEstimado: '7 dias',
      focoEspecial: profile.temDividas ? 'Negociação' : 'Movimentação'
    };
  }, [calculateScore]);

  // Sistema de transição de fases automático
  const checkPhaseTransition = useCallback(() => {
    const { currentPhase, userProgress } = state;

    switch (currentPhase) {
      case 'diagnostico':
        if (state.userProfile) {
          setState(prev => ({ ...prev, currentPhase: 'plano' }));
        }
        break;
      case 'plano':
        if (userProgress.progressoPlano >= 10) {
          setState(prev => ({ ...prev, currentPhase: 'checklist' }));
        }
        break;
      case 'checklist':
        if (userProgress.progressoPlano >= 90) {
          setState(prev => ({ ...prev, currentPhase: 'simulador' }));
        }
        break;
    }
  }, [state]);

  // Atualizar progresso em tempo real
  const updateProgress = useCallback(() => {
    const { completedTasks, userProfile } = state;
    
    let totalTasks = 0;
    let totalCompleted = 0;
    
    Object.values(dailyTasks).forEach(tasks => {
      totalTasks += tasks.length;
      totalCompleted += tasks.filter(task => completedTasks[task.id]).length;
    });
    
    const progressoPlano = (totalCompleted / totalTasks) * 100;
    const scoreSimulado = userProfile ? calculateScore(userProfile, completedTasks) : 0;
    const diasRestantes = Math.max(0, 7 - state.currentDay + 1);

    setState(prev => ({
      ...prev,
      userProgress: {
        ...prev.userProgress,
        progressoPlano,
        scoreSimulado,
        diasRestantes,
        faseAtual: prev.currentPhase
      }
    }));
  }, [state, calculateScore, dailyTasks]);

  // Efeitos para atualizações automáticas
  useEffect(() => {
    updateProgress();
    checkPhaseTransition();
  }, [state.completedTasks, state.userProfile, state.currentDay]);

  // Actions
  const setUserProfile = (profile: UserProfile) => {
    setState(prev => ({ ...prev, userProfile: profile }));
  };

  const setCurrentPhase = (phase: string) => {
    setState(prev => ({ ...prev, currentPhase: phase }));
  };

  const toggleTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      completedTasks: {
        ...prev.completedTasks,
        [taskId]: !prev.completedTasks[taskId]
      }
    }));
  };

  const setCurrentDay = (day: number) => {
    setState(prev => ({ ...prev, currentDay: day }));
  };

  const getCurrentDayProgress = () => {
    const currentTasks = dailyTasks[state.currentDay as keyof typeof dailyTasks];
    const completed = currentTasks.filter(task => state.completedTasks[task.id]).length;
    return (completed / currentTasks.length) * 100;
  };

  const isCurrentDayComplete = () => {
    const currentTasks = dailyTasks[state.currentDay as keyof typeof dailyTasks];
    return currentTasks.every(task => state.completedTasks[task.id]);
  };

  const getAllDaysCompleted = () => {
    return state.userProgress.progressoPlano >= 90;
  };

  const getPlan = () => {
    return state.userProfile ? generatePlan(state.userProfile) : null;
  };

  return {
    // State
    currentDay: state.currentDay,
    completedTasks: state.completedTasks,
    userProgress: state.userProgress,
    currentPhase: state.currentPhase,
    userProfile: state.userProfile,
    dailyTasks,

    // Actions
    setUserProfile,
    setCurrentPhase,
    toggleTask,
    setCurrentDay,

    // Computed
    getCurrentDayProgress,
    isCurrentDayComplete,
    getAllDaysCompleted,
    getPlan,
    calculateScore
  };
};
