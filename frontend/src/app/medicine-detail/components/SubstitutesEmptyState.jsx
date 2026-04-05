import { FlaskConical, PlusCircle } from 'lucide-react';

export default function SubstitutesEmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 bg-primary-lighter rounded-full flex items-center justify-center mx-auto mb-4">
        <FlaskConical size={28} className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mb-2">No substitutes found yet</h3>
      <p className="text-text-muted text-sm max-w-sm mx-auto mb-6 leading-relaxed">
        We haven&apos;t catalogued substitutes for this medicine yet. Know a bioequivalent
        alternative? Help the community by submitting it.
      </p>
      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-all duration-200">
        <PlusCircle size={15} />
        Submit a substitute
      </button>
    </div>
  );
}