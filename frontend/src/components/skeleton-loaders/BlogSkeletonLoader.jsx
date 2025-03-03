export default function SkeletonLoader({ orientation = "vertical" }) {
    let containerStyle = "absolute bottom-10 left-3 right-3 md:left-9";
    if (orientation === "vertical")
        containerStyle = "flex flex-col justify-center px-8 my-4";
    else if (orientation === "horizontal")
        containerStyle = "flex flex-col justify-center px-8 my-2";

    return (
        <div
            className={`${orientation === "vertical" ? "" : "flex"} col-span-7 lg:col-span-4 row-span-3 md:my-4 bg-[#3c3228] md:rounded-lg overflow-hidden relative group shadow-blog-main animate-pulse`}
        >
            {/* Imagen simulada */}
            {orientation === "main" ? (
                <div className="w-full h-full bg-gray-700"></div>
            ) : orientation === "horizontal" ? (
                <div className="h-full w-2/5 flex-shrink-0 bg-gray-700"></div>
            ) : (
                <div className="w-full h-2/5 flex-shrink-0 bg-gray-700"></div>
            )}

            {/* Contenido simulado */}
            <div className={`${containerStyle} text-left`}>
                <div className="w-20 h-6 bg-gray-600 rounded-md"></div>

                {orientation === "main" ? (
                    <div className="mt-3 w-3/4 h-8 bg-gray-500 rounded-md"></div>
                ) : (
                    <div className="mt-3 w-2/3 h-6 bg-gray-500 rounded-md"></div>
                )}

                <div className="mt-2 space-y-2">
                    <div className="w-full h-4 bg-gray-500 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-gray-500 rounded-md"></div>
                    <div className="w-2/3 h-4 bg-gray-500 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
