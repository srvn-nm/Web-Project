import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // لاگین موفقیت‌آمیز
      // دریافت توکن JWT و ادامه به صفحه چت
    } else {
      // خطا در لاگین
      // نمایش پیغام خطا به کاربر
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div>
      <h2>Login</h2>
      {/* فرم لاگین */}
      <form onSubmit={handleSubmit}>
        {/* فیلدها */}
        {/* دکمه لاگین */}
      </form>
    </div>
  );
};

export default LoginPage;
