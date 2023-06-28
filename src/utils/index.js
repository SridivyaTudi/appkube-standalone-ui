export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  if(user){
    return JSON.parse(user);
  }
  return null;
};

export const setCurrentUser = (user) => {
  if(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
  }
};

export const getCurrentOrgId = () => {
  return localStorage.getItem("currentOrgId");
};

export const setCurrentOrgId = (id) => {
  return localStorage.setItem("currentOrgId", id);
};
