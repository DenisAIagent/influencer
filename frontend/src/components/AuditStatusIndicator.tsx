import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  PlayIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export type AuditStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

interface AuditStatusIndicatorProps {
  status: AuditStatus;
  error?: string;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  pending: {
    icon: ClockIcon,
    text: 'En attente',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    borderColor: 'border-yellow-200 dark:border-yellow-800',
  },
  in_progress: {
    icon: PlayIcon,
    text: 'En cours',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  completed: {
    icon: CheckCircleIcon,
    text: 'Terminé',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-800',
  },
  failed: {
    icon: XCircleIcon,
    text: 'Échec',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
    borderColor: 'border-red-200 dark:border-red-800',
  },
};

const sizeConfig = {
  sm: {
    iconSize: 'h-4 w-4',
    textSize: 'text-xs',
    padding: 'px-2 py-1',
  },
  md: {
    iconSize: 'h-5 w-5',
    textSize: 'text-sm',
    padding: 'px-3 py-1.5',
  },
  lg: {
    iconSize: 'h-6 w-6',
    textSize: 'text-base',
    padding: 'px-4 py-2',
  },
};

export const AuditStatusIndicator: React.FC<AuditStatusIndicatorProps> = ({
  status,
  error,
  className = '',
  showText = true,
  size = 'md',
}) => {
  const config = statusConfig[status];
  const sizeConf = sizeConfig[size];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <motion.div
        className={`
          inline-flex items-center gap-1.5 rounded-full border
          ${config.bgColor} ${config.borderColor} ${sizeConf.padding}
        `}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Icône avec animation pour les statuts en cours */}
        <motion.div
          animate={
            status === 'in_progress'
              ? { rotate: 360 }
              : status === 'pending'
              ? { scale: [1, 1.1, 1] }
              : {}
          }
          transition={
            status === 'in_progress'
              ? { duration: 2, repeat: Infinity, ease: 'linear' }
              : status === 'pending'
              ? { duration: 1.5, repeat: Infinity }
              : {}
          }
        >
          <Icon className={`${sizeConf.iconSize} ${config.color}`} />
        </motion.div>

        {showText && (
          <span className={`font-medium ${config.color} ${sizeConf.textSize}`}>
            {config.text}
          </span>
        )}
      </motion.div>

      {/* Affichage de l'erreur si présente */}
      {error && status === 'failed' && (
        <motion.div
          className="inline-flex items-center gap-1 text-red-600 dark:text-red-400"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ExclamationTriangleIcon className="h-4 w-4" />
          <span className="text-xs max-w-xs truncate" title={error}>
            {error}
          </span>
        </motion.div>
      )}
    </div>
  );
};

// Composant pour afficher une barre de progression pour les audits en cours
interface AuditProgressBarProps {
  status: AuditStatus;
  className?: string;
}

export const AuditProgressBar: React.FC<AuditProgressBarProps> = ({
  status,
  className = '',
}) => {
  const getProgress = () => {
    switch (status) {
      case 'pending':
        return 10;
      case 'in_progress':
        return 60;
      case 'completed':
        return 100;
      case 'failed':
        return 100;
      default:
        return 0;
    }
  };

  const getColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const progress = getProgress();
  const colorClass = getColor();

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 ${className}`}>
      <motion.div
        className={`h-2 rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

// Hook personnalisé pour gérer le polling du statut d'audit
export const useAuditStatusPolling = (
  auditId: string | null,
  initialStatus?: AuditStatus
) => {
  const [status, setStatus] = React.useState<AuditStatus>(initialStatus || 'pending');
  const [error, setError] = React.useState<string | null>(null);
  const [isPolling, setIsPolling] = React.useState(false);

  React.useEffect(() => {
    if (!auditId || ['completed', 'failed'].includes(status)) {
      return;
    }

    setIsPolling(true);
    
    // Import dynamique pour éviter les dépendances circulaires
    import('../services/api').then(({ auditPolling }) => {
      auditPolling.pollAuditStatus(
        auditId,
        (statusUpdate) => {
          setStatus(statusUpdate.status);
          if (statusUpdate.error) {
            setError(statusUpdate.error);
          }
        },
        {
          interval: 3000,
          maxAttempts: 60,
          onComplete: () => {
            setIsPolling(false);
          },
          onError: (err) => {
            setError(err.message);
            setIsPolling(false);
          },
        }
      );
    });

    return () => {
      setIsPolling(false);
    };
  }, [auditId, status]);

  return { status, error, isPolling };
};

