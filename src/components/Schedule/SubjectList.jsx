export default function SubjectList({ subjects }) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Danh sách môn trong tuần</h2>
        {subjects.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {subjects.map(name => (
              <li key={name} className="text-sm">{name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Chưa có môn trong tuần này.</p>
        )}
      </div>
    );
} 