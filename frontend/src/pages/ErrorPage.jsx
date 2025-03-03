import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <section className="h-[55vh] w-11/12 justify-self-center">
            <h1>⛔¡Carga fallida!⛔</h1>
            <h2 className="mt-6">No te preocupes, este error puede deberse a varías razones, vuelve al inicio e intenta volver aquí más tarde. <br />¡Te esperamos fileteador! 🎨</h2>
            <p className="mt-2">🧐 {error}</p>
        </section>
        // <div
        //     className="flex flex-col space-y-4 h-screen justify-center items-center"
        //     id="error-page"
        // >
        //     <h1 className="text-5xl font-bold">¿Te perdiste Fileteador?</h1>
        //     <p className="text-xl">Perdon, ocurrió un error inesperado al navegar. Por favor, vuelve al inicio</p>
        //     <p>
        //         <i>{error.statusText || error.message}</i>
        //     </p>
        // </div>
    );
}