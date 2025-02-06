export const validationRules = {
  name: /^[A-Za-z-' ]+$/,
  birthday: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/,
  email: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  photoLink: /(https?:\/\/)?[-\w.]+(?=\.(?:jpg|png|jpeg|gif|bmp))/,
};
