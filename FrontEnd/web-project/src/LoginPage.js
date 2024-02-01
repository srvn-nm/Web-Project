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
    // ارسال درخواست لاگین به سرور
    // دریافت توکن JWT
    // انتقال به صفحه چت
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
