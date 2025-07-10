import api from './api';

// Đăng nhập
export const login = async ({ fullname, password }) => {
  const res = await api.post('/auth/login', { fullname, password });
  return res.data;
};

// Đăng ký (bệnh nhân mới)
export const signup = async (data) => {
  // data gồm FullName, Email, Password, Phone, Gender, DOB, Address, InsuranceNumber
  const res = await api.post('/auth/register', data);
  return res.data;
};

// Làm mới token
export const refreshToken = async (refreshToken) => {
  const res = await api.post('/auth/refresh-token', { refreshToken });
  return res.data;
};

// Đăng xuất (tuỳ backend, có thể chỉ xoá token local)
export const logout = () => {
  // Xoá token ở local, không cần gọi API nếu backend không lưu trạng thái
};