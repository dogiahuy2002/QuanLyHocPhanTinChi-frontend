export default function ConfirmDelete({ onConfirm, onCancel }) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-80">
          <h3 className="font-semibold mb-4">Xác nhận xoá lớp?</h3>
          <div className="flex gap-3">
            <button onClick={onConfirm} className="flex-1 bg-red-600 text-white py-2 rounded">Xoá</button>
            <button onClick={onCancel}  className="flex-1 bg-gray-300 py-2 rounded">Huỷ</button>
          </div>
        </div>
      </div>
    );
  }
  