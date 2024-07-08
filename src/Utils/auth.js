import useTodoStore from "../stores/todoListStore";

export const isLoggedIn = () => {
    return localStorage.getItem('login') === 'true';
};
  
export const login = () => {
    localStorage.setItem('login', 'true');
};

export const logout = () => {
    // Todo のリセット
    useTodoStore.getState().resetTodos();
    localStorage.removeItem('login');
};