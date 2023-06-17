export const Filter = ({ value, onChange }) => (
  <div>
    <label>
      <input type="text" name="filter" onChange={onChange} value={value} />
    </label>
  </div>
);
