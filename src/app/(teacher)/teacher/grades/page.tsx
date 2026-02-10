import GradebookClient from "@/components/teacher/grading/GradebookClient";
import { getGradebookData } from "@/app/actions/grading";

export default async function TeacherGradesPage() {
    const initialData = await getGradebookData();

    // We can't pass state down easily to the layout from here for the filter controls unless we make this page a Client Component 
    // OR we refactor SoftGradebookLayout to be smart.
    // The previous implementation was a Client Component page. 
    // To support server fetching of initialData, we might want to keep this a Server Component 
    // and pass initialData to a Client Wrapper that includes the Layout.

    // However, SoftGradebookLayout manages the scaffold.
    // Let's create `LiveGradebookPageClient` which wraps Layout + Table and accepts initialData.

    return <GradebookClient initialData={initialData} />;
}

// Inline client component for simplicity or extracting it would be better. 
// But `LiveGradebook` is the table wrapper. `SoftGradebookLayout` is the shell.
// Let's modify LiveGradebook.tsx to include the Layout? No, Layout is reusable.
// Let's make a new client component `GradebookClient.tsx`.
