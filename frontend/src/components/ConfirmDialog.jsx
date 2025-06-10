export default function ConfirmDialog({ mensagem, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-rose-100">
        <p className="mb-6 text-center text-gray-800 font-medium">{mensagem}</p>
        <div className="flex gap-4 justify-end">
          <button
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg transition"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
