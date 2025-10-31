
import { skills } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const getPlaceholderImage = (id: string) => {
  return PlaceHolderImages.find((img) => img.id === id);
};


export default function SkillDetailPage({ params }: { params: { id: string } }) {
  const skill = skills.find((s) => s.id === params.id);

  if (!skill) {
    notFound();
  }

  const placeholder = getPlaceholderImage(skill.image);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-card mb-8">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                data-ai-hint={placeholder.imageHint}
                fill
                className="object-cover"
              />
            )}
          </div>
          <h1 className="text-4xl font-bold mb-4">{skill.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{skill.description}</p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">What you&apos;ll learn</h2>
            <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Industry-relevant development practices.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Hands-on experience with modern frameworks.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> How to build and deploy applications.</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-primary" /> Portfolio-worthy project development.</li>
            </ul>
          </div>
        </div>
        <div className="lg:col-span-2">
            <div className="glass-card p-8 sticky top-24">
                <div className="flex items-baseline gap-2 mb-6">
                    <p className="text-3xl font-bold text-primary">$499.99</p>
                    <p className="text-xl text-muted-foreground line-through">$599.99</p>
                </div>
                <p className="text-sm text-muted-foreground mb-6">Get lifetime access to this program and all future updates.</p>
                <div className="flex flex-col gap-4">
                    <Link href={`/checkout-skill/${skill.id}`} className="w-full">
                        <Button size="lg" className="w-full gradient-btn gradient-btn-1 relative">
                            Enroll Now
                        </Button>
                    </Link>
                </div>
                 <div className="mt-8 text-xs text-center text-muted-foreground">
                    30-Day Money-Back Guarantee
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
