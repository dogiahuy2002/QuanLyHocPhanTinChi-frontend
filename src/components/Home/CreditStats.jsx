const CreditStats = ({ grades }) => {
    const totalPass = grades.reduce((acc, g) => acc + g.sumCreditPass, 0);
    const totalFail = grades.reduce((acc, g) => acc + g.sumCreditFail, 0);
    const totalReg = grades.reduce((acc, g) => acc + g.sumOfCreditRegis, 0);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-2xl shadow">
          <p className="font-semibold">Tín chỉ đã qua:</p>
          <p className="text-2xl">{totalPass}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-2xl shadow">
          <p className="font-semibold">Tín chỉ chưa qua:</p>
          <p className="text-2xl">{totalFail}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-2xl shadow">
          <p className="font-semibold">Tổng tín chỉ đăng ký:</p>
          <p className="text-2xl">{totalReg}</p>
        </div>
      </div>
    );
  };
  
  export default CreditStats;
  