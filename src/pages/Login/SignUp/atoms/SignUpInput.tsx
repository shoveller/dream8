import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pb } from '@/api/pocketbase';

interface UserData {
  user_name: string;
  nickName: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phone_number: string;
  address: string;
}

function SignUpInput() {
  const [userData, setUserData] = useState<UserData>({
    user_name: '',
    nickName: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phone_number: '',
    address: '',
  });

  const navigate = useNavigate();

  const addNameRef = useRef<HTMLInputElement>(null);
  const addNickNameRef = useRef<HTMLInputElement>(null);
  const addPasswordRef = useRef<HTMLInputElement>(null);
  const addPasswordConfirmRef = useRef<HTMLInputElement>(null);
  const addEmailRef = useRef<HTMLInputElement>(null);
  const addPhoneNumberRef = useRef<HTMLInputElement>(null);
  const addAddressRef = useRef<HTMLInputElement>(null);

  const handleAddress = () => {
    new daum.Postcode({
      oncomplete: function (data) {
        setUserData((prevUserData) => ({
          ...prevUserData,
          address: data.jibunAddress,
        }));
        // 주소 선택 후 입력 창에 주소 채우기

        if (addAddressRef.current) {
          addAddressRef.current.value = data.jibunAddress;
        }
      },
    }).open();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    // 각 input 요소의 값을 확인하고 유효성 검사
    if (
      !userData.email ||
      !userData.password ||
      !userData.passwordConfirm ||
      !userData.user_name ||
      !userData.nickName ||
      !userData.phone_number ||
      !userData.address
    ) {
      alert('모든 필드를 입력해주세요.');
      isValid = false;
    }

    if (!isValid) return;

    // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
    if (userData.password !== userData.passwordConfirm) {
      alert('비밀번호와 비밀번호 확인 값이 일치하지 않습니다.');
      return;
    }

    // 회원가입 처리 로직 추가

    try {
      // 데이터베이스에서 이미 가입된 회원 정보 가져오기
      const existingUsers = await pb.collection('users').getFullList();

      // 각 입력값과 데이터베이스에 있는 회원 정보 비교하여 중복 확인
      for (const user of Array.from(existingUsers)) {
        for (const key of Object.keys(userData)) {
          if (userData[key as keyof UserData] === user[key as keyof UserData]) {
            alert(`${key}이(가) 이미 사용 중입니다. 다른 값을 입력해주세요.`);
            return;
          }
        }
      }

      await pb.collection('users').create(userData);
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('Error logging in:', error);
    }

    navigate('/');
  };

  return (
    <form className="w-[28.625rem] " onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="mt-3">
          <label htmlFor="email">이메일</label>
          <input
            ref={addEmailRef}
            type="email"
            id="email"
            required
            aria-required="true"
            placeholder="이메일을 입력해주세요"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            className="border rounded-xl w-full h-[3.79rem]"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="password">비밀번호</label>
          <input
            ref={addPasswordRef}
            type="password"
            id="password"
            required
            aria-required="true"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="border rounded-xl w-full h-[3.79rem]"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            ref={addPasswordConfirmRef}
            type="password"
            id="passwordConfirm"
            required
            aria-required="true"
            placeholder="비밀번호를 한번더 입력해주세요"
            onChange={(e) =>
              setUserData({ ...userData, passwordConfirm: e.target.value })
            }
            className="border rounded-xl w-full h-[3.79rem]"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="user_name">이름</label>
          <input
            ref={addNameRef}
            type="text"
            id="user_name"
            required
            aria-required="true"
            placeholder="이름을 입력해주세요"
            onChange={(e) =>
              setUserData({ ...userData, user_name: e.target.value })
            }
            className="border rounded-xl w-full h-[3.79rem]"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="nickName">닉네임</label>
          <input
            ref={addNickNameRef}
            type="text"
            id="nickName"
            required
            aria-required="true"
            placeholder="닉네임을 입력해주세요"
            onChange={(e) =>
              setUserData({ ...userData, nickName: e.target.value })
            }
            className="border rounded-xl w-full h-[3.79rem]"
          />
        </div>
        <div className="mt-3">
          <label htmlFor="phone_number">휴대폰 번호</label>
          <input
            ref={addPhoneNumberRef}
            type="tel"
            id="phone_number"
            required
            aria-required="true"
            placeholder="휴대폰 번호입력 ( - 제외 11자리 입력)"
            onChange={(e) =>
              setUserData({ ...userData, phone_number: e.target.value })
            }
            className="border rounded-xl w-full h-[3.79rem]"
          />
        </div>
        <div className="mt-3 flex items-center">
          <label htmlFor="address" className="flex-1">
            주소
            <input
              ref={addAddressRef}
              type="text"
              id="address"
              required
              aria-required="true"
              placeholder="주소를 입력해주세요"
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              className="border rounded-xl w-full h-[3.79rem]"
            />
          </label>
          <button
            type="button"
            className="border rounded-xl w-20 h-[3.79rem] ml-3 mt-6"
            onClick={handleAddress}
          >
            주소입력
          </button>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="text-2xl border-4 rounded-xl w-full h-[3.79rem] border-blue-700"
          >
            확인
          </button>
        </div>
        <div className="mt-3">
          <button
            type="button"
            className="text-white text-2xl rounded-xl w-full h-[3.79rem] bg-blue-700"
          >
            취소
          </button>
        </div>
      </div>
    </form>
  );
}

export default SignUpInput;
