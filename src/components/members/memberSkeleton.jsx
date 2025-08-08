import { Skeleton } from "@/components/ui/skeleton";

export const MemberSkeleton = ({ count = 1 }) => {
    return (
        <div className="w-full">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-full mt-4">
                    <div className="xs:max-w-[400px] md:w-[600px] lg:max-w-[600px] border rounded-lg shadow-sm bg-white">
                        <div className="flex gap-3 p-4">
                            <div className='w-[80px] h-[80px] overflow-hidden'>
                                <Skeleton className="w-full h-full rounded-full" />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MemberSkeleton;