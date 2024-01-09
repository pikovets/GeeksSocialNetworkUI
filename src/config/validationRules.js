export const validationRules = {
  name: /^[A-Za-z-' ]+$/,
  birthday: /^(0?[1-9]|1[0-2])\/(0?[1-9]|[1-2][0-9]|3[0-1])\/\d{2,4}$/,
  email: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  photoLink: /(https?:\/\/)?[-\w.]+(?=\.(?:jpg|png|jpeg|gif|bmp))/,
};
