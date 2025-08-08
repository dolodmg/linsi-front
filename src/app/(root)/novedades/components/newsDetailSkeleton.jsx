import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export const NewsDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link href="/novedades">
                        <button className="inline-flex items-center gap-2 px-4 py-2 text-blue-700 hover:text-blue-900 font-medium transition-colors duration-200">
                            <IoArrowBack className="text-lg" />
                            Volver a Noticias
                        </button>
                    </Link>
                </div>
            </nav>

            <article className="max-w-5xl mx-auto px-4 py-8 lg:py-12">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="p-8 lg:p-12">
                        <header className="mb-8">
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-4 h-4 rounded-full" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            </div>
                            <div className="space-y-1 mb-6">
                                <Skeleton className="h-10 w-4/5" />
                            </div>
                            <div className="w-full h-1 bg-gradient-to-r from-blue-700 to-purple-600 rounded-full mb-6"></div>
                        </header>
                        <section className="prose prose-lg max-w-none">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96">
                                    <Skeleton className="w-full h-64 rounded-lg" />
                                </div>
                            
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-3">
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-5/6" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-4/5" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-6 w-full" />
                                        <Skeleton className="h-6 w-5/6" />
                                        <Skeleton className="h-6 w-2/3" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <footer className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-48" />
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-blue-700 rounded-full"></div>
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                                </div>
                            </div>
                        </footer>
                    </div>

                    <div className="text-center p-8 bg-gray-50">
                        <Skeleton className="h-12 w-48 mx-auto rounded-xl" />
                    </div>
                </div>
            </article>
        </div>
    );
};

export default NewsDetailSkeleton;
