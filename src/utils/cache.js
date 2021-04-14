
export const setLocalTransactions = (data) => {
  window.localStorage.setItem('local_trans', data);
};

export const getLocalTransactions = () => window.localStorage.getItem('local_trans');

export const setAsyncData = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const getAsyncData = (key) => window.localStorage.getItem(key);
