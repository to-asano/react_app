import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  // Todo リスト
  todos: [],
  // Todo 自動連番
  idCounter: 1,
  // 選択されている日付
  selectedDate: null,

  // Sidebarで選択中の日付
  setSelectedDate: (date) => set({ selectedDate: date }),
  
  // Todo 追加
  addTodo: (date, title, content) => set((state) => {
    const newId = state.idCounter;
    return {
      todos: [...state.todos, { id: newId, date: new Date(date).toISOString(), title, content, completed: false }],
      idCounter: newId + 1
    };
  }),
  
  // Todo 取得
  getTodos: () => get().todos,
  
  // 選択された日付のTodoリストを取得するセレクター
  getSelectedDateTodos: () => {
    const { todos, selectedDate } = get();
    if (selectedDate) {
      return todos.filter(todo => todo.date === selectedDate);
    } else {
      return todos;
    }
  },

  // 日付リスト取得
  getDates: () => {
    const todos = get().todos;
    const uniqueDates = [...new Set(todos.map(todo => todo.date))];
    return uniqueDates.sort((a, b) => new Date(a) - new Date(b));
  },

  // Todo リセット
  resetTodos: () => set({
    todos: [],
    idCounter: 1,
    selectedDate: null
  }),
}))

export default useTodoStore
