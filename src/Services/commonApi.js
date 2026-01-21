
export const getToken = () => {
  const user = JSON.parse(localStorage.getItem("_u"));
  return user?.token;
  };
  
  export const getCurrentUserId = () => {
    const user = JSON.parse(localStorage.getItem("_u"));
    return user?.accountId;
  };
  
  export const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
