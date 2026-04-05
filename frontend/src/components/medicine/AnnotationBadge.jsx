import { ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const ANNOTATION_CONFIG = {
  VERIFIED_SAFE: {
    label: 'Verified Safe',
    icon: ShieldCheck,
    classes: 'bg-green-50 text-green-700 border border-green-200',
    iconColor: 'text-green-600',
  },
  USE_WITH_CAUTION: {
    label: 'Use with Caution',
    icon: AlertTriangle,
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
    iconColor: 'text-amber-500',
  },
  NOT_RECOMMENDED: {
    label: 'Not Recommended',
    icon: XCircle,
    classes: 'bg-red-50 text-red-700 border border-red-200',
    iconColor: 'text-red-500',
  },
};

export default function AnnotationBadge({ status, reason }) {
  const config = ANNOTATION_CONFIG?.[status];
  if (!config) return null;
  const Icon = config?.icon;

  return (
    <div className="space-y-1.5">
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config?.classes}`}>
        <Icon size={13} className={config?.iconColor} />
        {config?.label}
      </div>
      {reason && (
        <p className="text-xs text-text-muted leading-relaxed pl-1">
          <span className="font-medium text-text-secondary">Note:</span> {reason}
        </p>
      )}
    </div>
  );
}