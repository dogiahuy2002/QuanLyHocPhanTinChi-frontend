const GradeSummary = ({ grade }) => (
    <div className="bg-gray-50 p-4 mt-4 rounded-md border space-y-1">
      <h3 className="font-semibold">Điểm trung bình học kỳ (10): {grade.avgScore10}</h3>
      <h3 className="font-semibold">Điểm trung bình học kỳ (4): {grade.avgScore4}</h3>
      <h3 className="font-semibold">Tích lũy (10): {grade.avgAccumulateScore}</h3>
      <h3 className="font-semibold">Tích lũy (4): {grade.avgAccumulateScore4}</h3>
      <h3 className="font-semibold">Tín chỉ đã qua: {grade.sumCreditPass}</h3>
      <h3 className="font-semibold">Tín chỉ chưa qua: {grade.sumCreditFail}</h3>
      <h3 className="font-semibold">Tín chỉ đã đăng ký: {grade.sumOfCreditRegis}</h3>
      <h3 className="font-semibold">Tín chỉ tích lũy đã qua: {grade.sumOfCreditAccumulatePass}</h3>
      <h3 className="font-semibold">Xếp loại tích lũy: {grade.rankerAccumulate}</h3>
      <h3 className="font-semibold">Xếp loại học kỳ: {grade.rankerOfTerm}</h3>
    </div>
  );
  
  export default GradeSummary;
  