"use server";

import { smtpTransport } from "../libs/email";

interface VerificationResult {
  message: string;
  ok: boolean;
}

export async function requestConsultation(
  formData: FormData
): Promise<VerificationResult> {
  if (!formData.get("consent")) {
    return {
      message: "개인정보 수집 및 이용동의가 되지 않았습니다.",
      ok: false,
    };
  }

  const question = {
    name: formData.get("name"),
    phoneNumber: formData.get("phone"),
    area: formData.get("area"),
  };

  if (
    typeof question.name !== "string" ||
    typeof question.phoneNumber !== "string" ||
    typeof question.area !== "string"
  ) {
    return {
      message: "유효한 데이터 형식이 아닙니다.",
      ok: false,
    };
  }
  try {
    const mailOptions = {
      from: `${process.env.NAVER_SMTP_ID}@naver.com`,
      to: `${process.env.NAVER_SMTP_ID}@naver.com`,
      subject: "[Clover] 상담 신청하기",
      html: `
    <div
  style="
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    margin: 0;
    padding: 0;
  "
>
  <div
    style="
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
    "
  >
    <div
      style="
        text-align: center;
        border-bottom: 2px solid #4a90e2;
        padding-bottom: 15px;
        margin-bottom: 20px;
      "
    >
      <h1 style="font-size: 24px; color: #4a90e2; margin: 0">
        Clover 고객 정보 수집 알림
      </h1>
    </div>
    <div style="font-size: 16px; line-height: 1.6">
      <p>안녕하세요,</p>
      <p>아래 고객 정보를 Clover 홈페이지에서 수집했습니다.</p>
      <table
        style="
          width: 100%;
          border-collapse: collapse;
          margin-top: 15px;
          border: 1px solid #ddd;
        "
      >
        <tr>
          <th
            style="
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
              background-color: #f0f0f0;
              color: #555;
            "
          >
            이름
          </th>
          <td style="border: 1px solid #ddd; padding: 10px; text-align: left">
            ${question.name}
          </td>
        </tr>
        <tr>
          <th
            style="
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
              background-color: #f0f0f0;
              color: #555;
            "
          >
            전화번호
          </th>
          <td style="border: 1px solid #ddd; padding: 10px; text-align: left">
            ${question.phoneNumber}
          </td>
        </tr>
         <tr>
          <th
            style="
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
              background-color: #f0f0f0;
              color: #555;
            "
          >
            창업 희망지역
          </th>
          <td style="border: 1px solid #ddd; padding: 10px; text-align: left">
            ${question.area}
          </td>
        </tr>
      </table>
      <p>위 정보를 확인해주시기 바랍니다.</p>
    </div>
    <div
      style="
        text-align: center;
        font-size: 12px;
        color: #777;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #ddd;
      "
    >
      <p>
        본 메일은 Clover 웹사이트를 통해 수집된 정보를 바탕으로
        발송되었습니다.
      </p>
    </div>
  </div>
</div>
  `,
    };
    await smtpTransport.sendMail(mailOptions);
  } catch (e) {
    console.log(e);

    return {
      message: "상담 신청하기 발송 실패하였습니다.",
      ok: false,
    };
  }

  return {
    message: "제출 완료되었습니다. 신청해주셔서 감사드립니다.",
    ok: true,
  };
}
