"use client";

import styles from "../page.module.css";
import { useState } from "react";

const FormSection = () => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: string = e.target.value;
    const onlyNumbers: string = inputValue.replace(/[^0-9]/g, "");
    setPhone(onlyNumbers);
  };

  const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.currentTarget.checked);
  };

  return (
    <footer className={styles.formWrap}>
      <form action="">
        <div className={styles.inputWrap}>
          <div className={styles.formRow}>
            <div>이름</div>
            <input
              type="text"
              placeholder="이름을 입력하세요."
              onChange={handleChangeName}
            />
          </div>
          <div className={styles.formRow}>
            <div>연락처</div>
            <input
              type="text"
              placeholder="예) 01012345678"
              maxLength={11}
              value={phone}
              onChange={handleChangePhone}
            />
          </div>
          <div className={styles.formRow}>
            <div>창업 희망지역</div>
            <input type="text" placeholder="예) 서울특별시 광진구 능동" />
          </div>
        </div>
        <div className={styles.checkWrap}>
          <input
            type="checkbox"
            id="agree"
            name="agree"
            onChange={handleChangeCheck}
            checked={isCheck}
          />
          <label htmlFor="agree">개인정보 취급방침 동의</label>
        </div>
        <button className={styles.submitBtn}>무료상담 신청하기</button>
      </form>
    </footer>
  );
};

export default FormSection;
