import create from 'zustand';

let useHexagonStore = create((set) => ({
  lineColor: '#000000',
  backgroundColor: '#FFFFFF',
  strokeWidth: 5
}));

export default useHexagonStore;