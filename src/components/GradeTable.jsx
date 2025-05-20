const GradeTable = ({ subjects }) => {
    return (
      <table className="w-full table-auto border     shadow-sm rounded-xl overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {["Mã môn", "Tên môn", "Tín chỉ", "Giữa kỳ", "Cuối kỳ", "Điểm số", "Xếp loại"].map((header) => (
              <th key={header} className="px-4 py-2 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subject_id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{subject.subject.subject_id}</td>
              <td className="px-4 py-2 border">{subject.subject.subject_name}</td>
              <td className="px-4 py-2 border">{subject.subject.credits}</td>
              <td className="px-4 py-2 border">{subject.midterm}</td>
              <td className="px-4 py-2 border">{subject.final}</td>
              <td className="px-4 py-2 border">{subject.digit_score}</td>
              <td className="px-4 py-2 border">{subject.letter_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default GradeTable;
  