export const getCurrentUser = () => {
  return localStorage.getItem("currentUser");
};

export const setCurrentUser = (user) => {
  return localStorage.setItem("currentUser", user);
};

export const getCurrentOrgId = () => {
  return localStorage.getItem("currentOrgId");
};

export const setCurrentOrgId = (id) => {
  return localStorage.setItem("currentOrgId", id);
};
