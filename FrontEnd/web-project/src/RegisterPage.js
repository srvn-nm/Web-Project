import React, { useState } from 'react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    username: '',
    password: '',
    image: null,
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ارسال درخواست ثبت‌نام به سرور
    // ایجاد توکن JWT
    // انتقال به صفحه چت
  };

  return (
    <div>
      <h2>Register</h2>
      {/* فرم ثبت‌نام */}
      <form onSubmit={handleSubmit}>
        {/* فیلدها */}
        {/* دکمه ثبت‌نام */}
      </form>
    </div>
  );
};

export default RegisterPage;
