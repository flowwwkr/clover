"use client";

import { requestConsultation } from "../actions/request-consultation";
import styles from "../page.module.css";
import { useState } from "react";

const FormSection = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);
  //창업 희망지역
  const [area, setArea] = useState<string>("");

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    const onlyNumbers: string = inputValue.replace(/[^0-9]/g, "");
    setPhone(onlyNumbers);
  };

  const handleChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArea(e.target.value);
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.currentTarget.checked);
  };

  return (
    <footer className={styles.formWrap}>
      <form
        action={async (formData: FormData) => {
          if (name.length < 2) {
            alert("이름을 2글자 이상 입력해주세요.");
            return;
          } else if (phone.length < 10) {
            alert("올바른 전화번호를 입력해주세요.");
            return;
          } else if (area.length < 2) {
            alert("지역을 2글자 이상 입력해주세요.");
            return;
          } else if (!isCheck) {
            alert("개인정보 취급방침에 동의해주세요.");
            return;
          }

          const result = await requestConsultation(formData);
          if (result.ok) {
            alert(result.message);
            window.location.reload();
          } else {
            alert(result.message);
          }
        }}
      >
        <div className={styles.inputWrap}>
          <div className={styles.formRow}>
            <div>이름</div>
            <input
              type="text"
              name="name"
              placeholder="이름을 입력하세요."
              onChange={handleChangeName}
              value={name}
              required
            />
          </div>
          <div className={styles.formRow}>
            <div>연락처</div>
            <input
              type="text"
              name="phone"
              placeholder="예) 01012345678"
              maxLength={11}
              required
              value={phone}
              onChange={handleChangePhone}
            />
          </div>
          <div className={styles.formRow}>
            <div>창업 희망지역</div>
            <input
              name="area"
              type="text"
              placeholder="예) 서울특별시 광진구 능동"
              required
              value={area}
              onChange={handleChangeArea}
            />
          </div>
        </div>
        <div className={styles.checkWrap}>
          <input
            type="checkbox"
            id="consent"
            name="consent"
            required
            onChange={handleChangeCheck}
            checked={isCheck}
          />
          <label htmlFor="consent">개인정보 취급방침 동의</label>
        </div>
        <button type="submit" className={styles.submitBtn}>
          무료상담 신청하기
        </button>
      </form>
    </footer>
  );
};

export default FormSection;
