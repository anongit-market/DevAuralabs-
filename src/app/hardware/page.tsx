
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu } from "lucide-react";

export default function HardwarePage() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center mb-12">
        <Cpu className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Hardware Store</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of high-performance hardware, from custom PCs to essential components.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder for hardware items */}
        {[1, 2, 3].map((item) => (
          <Card key={item} className="glass-card">
            <CardHeader>
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                <Cpu className="w-24 h-24 text-muted-foreground" />
              </div>
              <CardTitle>Hardware Product {item}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                A brief description of the hardware product will go here.
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
