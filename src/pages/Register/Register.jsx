import React, { useState } from 'react';
import './register.css'; 

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Inputni yangilash
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Tasdiqlash kodi yuborish
  const handleSendCode = async () => {
    // Backendga so'rov yuborish uchun API chaqiruvini yaratamiz
    const response = await fetch('/api/send-verification-code', {
      method: 'POST',
      body: JSON.stringify({ contact: formData.contact }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setIsCodeSent(true);
      alert('Tasdiqlash kodi yuborildi!');
    } else {
      alert('Kod yuborishda xatolik yuz berdi');
    }
  };

  // Kodni tekshirish
  const handleVerifyCode = () => {
    // Kodni tekshirish
    if (formData.verificationCode === '123456') { // Buni backendda tasdiqlash kerak
      setIsCodeVerified(true);
      alert('Kod tasdiqlandi!');
    } else {
      alert('Noto\'g\'ri kod');
    }
  };

  // Ro'yhatdan o'tish
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Parollar mos kelmayapti');
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      contact: formData.contact,
      password: formData.password,
    };

    // Backendga foydalanuvchi ma'lumotlarini yuborish
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setIsSubmitted(true);
      alert('Ro\'yhatdan o\'tdingiz');
    } else {
      alert('Ro\'yhatdan o\'tishda xatolik yuz berdi');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Ro'yhatdan o'tish</h2>
        {!isCodeVerified ? (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label for="firstName">Ism</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label for="lastName">Familiya</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label for="contact">Email yoki Telefon raqami</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                required
              />
            </div>
            {!isCodeSent ? (
              <button
                type="button"
                onClick={handleSendCode}
                className="send-code-btn"
              >
                Tasdiqlash kodini yuborish
              </button>
            ) : (
              <div>
                <div className="input-group">
                  <label for="verificationCode">Tasdiqlash kodi</label>
                  <input
                    type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="verify-code-btn"
                >
                  Kodni tasdiqlash
                </button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label for="password">Parol</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-group">
              <label for="confirmPassword">Parolni takrorlash</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Ro'yhatdan o'tish
            </button>
          </form>
        )}
        {isSubmitted && <p className="success-message">Ro'yhatdan o'tish muvaffaqiyatli amalga oshdi!</p>}
      </div>
    </div>
  );
}

export default Register;
