import { Skeleton } from "@/components/ui/skeleton";

export const NewsSkeleton = ({ count = 3 }) => {
    return (
        <div className="container mx-auto px-2 sm:px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="px-4">
                        <div className="w-full h-[400px] border rounded-lg shadow-sm bg-white">
                            {/* Header con imagen */}
                            <div className="flex justify-center p-4">
                                <Skeleton className="w-full h-48 rounded-lg" />
                            </div>
                            {/* Body con contenido */}
                            <div className="text-center p-4 space-y-3">
                                <Skeleton className="h-6 w-3/4 mx-auto" />
                                <div className="w-full h-px bg-gray-200 my-2" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6 mx-auto" />
                                <Skeleton className="h-3 w-1/2 mx-auto mt-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsSkeleton;