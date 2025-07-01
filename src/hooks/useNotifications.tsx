
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'achievement' | 'warning';
  scheduledFor: Date;
  sent: boolean;
}

export const useNotifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Verifica notificações pendentes a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      checkPendingNotifications();
    }, 60000); // 1 minuto

    return () => clearInterval(interval);
  }, [notifications]);

  const checkPendingNotifications = () => {
    const now = new Date();
    const pendingNotifications = notifications.filter(
      notification => !notification.sent && notification.scheduledFor <= now
    );

    pendingNotifications.forEach(notification => {
      sendNotification(notification);
    });
  };

  const sendNotification = (notification: Notification) => {
    toast({
      title: notification.title,
      description: notification.message,
    });

    // Marcar como enviada
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, sent: true } : n)
    );
  };

  const scheduleNotification = (
    title: string,
    message: string,
    scheduledFor: Date,
    type: 'reminder' | 'achievement' | 'warning' = 'reminder'
  ) => {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      scheduledFor,
      sent: false
    };

    setNotifications(prev => [...prev, notification]);
  };

  const scheduleDailyReminder = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 9:00 AM

    scheduleNotification(
      "Lembrete Diário! 🚀",
      "Não esqueça de completar suas tarefas financeiras de hoje.",
      tomorrow,
      'reminder'
    );
  };

  const scheduleScoreCheckReminder = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(10, 0, 0, 0);

    scheduleNotification(
      "Hora de verificar seu Score! 📊",
      "Uma semana se passou. Que tal verificar como está seu score?",
      nextWeek,
      'reminder'
    );
  };

  return {
    notifications,
    scheduleNotification,
    scheduleDailyReminder,
    scheduleScoreCheckReminder
  };
};
