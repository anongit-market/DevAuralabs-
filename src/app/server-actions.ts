
'use server';

import { initializeFirebase } from '@/firebase/server';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';

export async function seedInitialData() {
    const { firestore } = initializeFirebase();

    const initialShowcaseData = [
        {
          alt: 'App Development',
          url: 'https://i.ibb.co/gFdWxx65/1000496340-removebg-preview.png',
        },
        {
          alt: 'Cybersecurity',
          url: 'https://i.ibb.co/sdF55N83/IMG-20251031-123738.jpg',
        },
        {
          alt: 'Web Development',
          url: 'https://i.ibb.co/DDtWW3zw/1000496339-removebg-preview.png',
        },
        {
          alt: 'Engagement Skill',
          url: 'https://i.ibb.co/BHBKP0Xm/Adobe-Express-file.png',
        },
    ];

    try {
        const showcaseRef = collection(firestore, 'showcase');
        const showcaseSnapshot = await getDocs(showcaseRef);

        if (!showcaseSnapshot.empty) {
            return { success: true, message: 'Showcase data already exists. No action taken.' };
        }

        const batch = writeBatch(firestore);
        initialShowcaseData.forEach(item => {
            const docRef = doc(showcaseRef); // Create a new doc with auto-generated ID
            batch.set(docRef, item);
        });

        await batch.commit();

        return { success: true, message: 'Successfully seeded showcase data.' };

    } catch (error: any) {
        console.error("Error seeding database:", error);
        return { success: false, message: `An error occurred while seeding the database: ${error.message}` };
    }
}
