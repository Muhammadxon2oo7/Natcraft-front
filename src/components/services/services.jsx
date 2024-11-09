import React from 'react'
import './services.css'

import quality from '../../assets/img/services/quality.png'
import callCenter from '../../assets/img/services/call-center-service.png'
import cheaper from '../../assets/img/services/cheaper.png'
import delivery from '../../assets/img/services/fast-delivery.png'

const Services = () => {
  return (
    <>
<section className="services">
  <h2>Bizning Xizmatlarimiz</h2>
  <div className="service-cards">
    
    <div className="card">
      <i className="fas fa-gem">
        <img src={quality} alt="" />
      </i>
      <h3>Yuqori sifat</h3>
      <p>Mahsulotlarimiz yuqori sifat standartlariga javob beradi va eng yaxshi materiallardan tayyorlangan.</p>
    </div>

    <div className="card">
      <i className="fas fa-tags">
        <img src={cheaper} alt="" />
      </i>
      <h3>Hamyonbop narx</h3>
      <p>Eng maqbul narxlarda yuqori sifatli mahsulotlar taqdim etamiz. Har bir xarid arzon va sifatli.</p>
    </div>

    
    <div className="card">
      <i className="fas fa-shipping-fast">
        <img src={delivery} alt="" />
      </i>
      <h3>Tezkor yetkazib berish</h3>
      <p>Biz tezkor yetkazib berishni kafolatlaymiz, shunda siz mahsulotlaringizga o`z vaqtida ega bo`lasiz.</p>
    </div>

    <div className="card">
      <i className="fas fa-headset">
        <img src={callCenter} alt="" />
      </i>
      <h3>24/7 Call Center</h3>
      <p>Har qanday savol yoki muammolaringiz uchun 24/7 xizmat ko`rsatuvchi call centerimiz mavjud.</p>
    </div>
  </div>
</section>
    </>
  )
}

export default Services