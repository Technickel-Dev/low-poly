import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer'

const store = (set) => ({
  lineColor: '#000000',
  backgroundColor: '#FFFFFF',
  strokeWidth: 5,
  setLineColor: (lineColor) => set(produce(state => {
    state.lineColor = lineColor
  })),
  setBackgroundColor: (backgroundColor) => set(produce(state => {
    state.backgroundColor = backgroundColor
  })),
  setStrokeWidth: (strokeWidth) => set(produce(state => {
    state.strokeWidth = strokeWidth
  }))
});

const useHexagonStore = create(devtools(store));

export default useHexagonStore;