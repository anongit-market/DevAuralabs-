
import EditHardwarePageForm from '@/components/edit-hardware-page-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { initializeFirebase } from '@/firebase/server';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';

async function getHardware(id: string) {
    const { firestore } = initializeFirebase();
    const hardwareRef = doc(firestore, 'hardware', id);
    const hardwareSnap = await getDoc(hardwareRef);

    if (!hardwareSnap.exists()) {
        return null;
    }

    return { ...hardwareSnap.data(), id: hardwareSnap.id };
}

export default async function EditHardwarePage({ params }: { params: { id: string } }) {
  const hardware = await getHardware(params.id);

  if (!hardware) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>Edit Hardware Product</CardTitle>
                    <CardDescription>Update the details for "{hardware.name}".</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* @ts-ignore */}
                    <EditHardwarePageForm hardware={hardware} />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
