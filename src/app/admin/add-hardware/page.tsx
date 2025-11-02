
import AddHardwarePageForm from '@/components/add-hardware-page-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AddHardwarePage() {
  return (
    <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Add a New Hardware Product</CardTitle>
                    <CardDescription>Fill out the details below to add a new hardware product to the store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddHardwarePageForm />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
