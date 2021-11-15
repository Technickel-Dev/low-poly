import create from 'zustand';
import { devtools } from 'zustand/middleware';
import produce from 'immer'

const store = (set) => ({
  lineColor: '#000000',
  backgroundColor: '#FFFFFF',
  strokeWidth: 5,
  dataPath: '125 125 125 225 225 225 225 125',
  fileURL: null,
  setLineColor: (lineColor) => set(produce(state => {
    state.lineColor = lineColor
  })),
  setBackgroundColor: (backgroundColor) => set(produce(state => {
    state.backgroundColor = backgroundColor
  })),
  setStrokeWidth: (strokeWidth) => set(produce(state => {
    state.strokeWidth = strokeWidth
  })),
  setDataPath: (dataPath) => set(produce(state => {
    state.dataPath = dataPath
  })),
  setFileURL: (fileURL) => set(produce(state => {
    state.fileURL = fileURL
  })),
});

const useHexagonStore = create(devtools(store));

export default useHexagonStore;