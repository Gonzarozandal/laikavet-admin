import { Link } from "react-router-dom";

function HeaderComponents() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 fixed top-0 left-0 overflow-hidden">
            {/* Logo/Título principal */}
            <div className="mb-12 text-center">
                <div className="flex items-center justify-center mb-4">
                    <span className="text-6xl mb-2">🐾</span>
                </div>
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    LaikaVet
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Sistema de Gestión Veterinaria
                </p>
            </div>

            {/* Botón principal */}
            <Link to="/HistorialClinicaPage">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-12 py-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <span className="flex items-center gap-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Historial Clinica
                    </span>
                </button>
            </Link>

            {/* Información adicional opcional */}
            <div className="mt-12 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Versión 1.0.0
                </p>
            </div>
        </div>
    );
}

export default HeaderComponents;