const GradeFilter = ({ filters, onFilterChange }) => {
    const { year, term, options } = filters;
  
    return (
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={year}
          onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
          className="border px-3 py-1 rounded"
        >
          <option value="">Tất cả năm</option>
          {options.years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
  
        <select
          value={term}
          onChange={(e) => onFilterChange({ ...filters, term: e.target.value })}
          className="border px-3 py-1 rounded"
        >
          <option value="">Tất cả học kỳ</option>
          {options.terms.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default GradeFilter;
  