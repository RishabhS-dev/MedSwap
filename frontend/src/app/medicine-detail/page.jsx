import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MedicineDetailContent from './components/MedicineDetailContent';

export const metadata = {
  title: 'Crocin Advance — Substitutes & Price Comparison | MedSwap',
  description:
    'Find doctor-verified, affordable substitutes for Crocin Advance (Paracetamol 500mg). Compare prices and check safety annotations.',
};

export default function MedicineDetailPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <MedicineDetailContent />
      </main>
      <Footer />
    </div>
  );
}