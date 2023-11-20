export const validationRules = {
  firstName: /^[A-Za-z' ]+$/,
  lastName: /^[A-Za-z' ]+$/,
  email: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
};