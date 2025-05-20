const FilterBar = ({ grades, setSelectedTerm }) => {
    const uniqueTerms = [...new Set(grades.map(g => `${g.term}/${g.year}`))];
  
    return (
      <div className="flex gap-2 items-center">
        <label className="font-semibold">Lọc theo học kỳ:</label>
        <select
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">Tất cả</option>
          {uniqueTerms.map(term => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FilterBar;
  