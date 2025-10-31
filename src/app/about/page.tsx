
import { ShieldEllipsis, KeyRound } from "lucide-react";
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-8">
            <ShieldEllipsis className="w-24 h-24 text-primary"/>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About DevAura Labs</h1>
        <div className="prose prose-invert lg:prose-xl mx-auto text-muted-foreground space-y-6">
            <p>
                At DevAura Labs, we stand at the intersection of education, technology, and security. Born from a passion for empowering individuals and businesses in the digital age, our mission is to provide an all-in-one platform for mastering critical tech skills and building secure, high-performance web solutions.
            </p>
            <p>
                Our team comprises industry veterans, cybersecurity experts, and seasoned developers dedicated to delivering cutting-edge courses and top-tier web creation services. We believe that knowledge is the ultimate defense and that a powerful online presence is essential for success.
            </p>
            <p>
                Whether you're looking to launch a career in cybersecurity, sharpen your development skills, or create a standout website for your business, DevAura Labs is your trusted partner. We are committed to fostering a community of learners and builders who are ready to shape the future of technology.
            </p>
            <p className="text-lg font-semibold text-foreground">
                Join us, and let&apos;s master, build, and secure the digital world together.
            </p>
        </div>

        <Separator className="my-12 bg-white/10" />

        <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
                <KeyRound className="w-16 h-16 text-primary/50"/>
            </div>
            <h2 className="text-2xl font-bold mb-4">Private Access</h2>
            <p className="text-muted-foreground mb-6">
                The following link is for authorized personnel only and provides access to the private administrative area of DevAura Labs.
            </p>
            <Link href="/login?view=admin" className="font-semibold text-primary hover:underline">
                Connect Private (Authorized Only)
            </Link>
        </div>

      </div>
    </div>
  );
}
