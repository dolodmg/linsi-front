import { Skeleton } from "@/components/ui/skeleton";

export const ProjectSkeleton = ({ count = 1 }) => {
    return (
        <div className="w-full">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-full mb-4">
                    <div className="border-none shadow-md bg-gray-200 rounded-lg px-6 py-4">
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProjectSkeleton;