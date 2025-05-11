"use client"
import './home.css'
import {useRef, useState, useCallback} from 'react';

export default function Home() {
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [mobile, setMobile] = useState('')
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>(null);

  // 提交操作
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const mobile = formData.get('mobile') as string;
    const code = formData.get('code') as string;

    if (!mobile) {
      setMobileError("请输入手机号");
      setIsSubmitting(false);
      return;
    } else if (!/^\d{11}$/.test(mobile)) {
      setMobileError("手机号格式错误");
      setIsSubmitting(false);
      return;
    } else {
      setMobileError(null);
    }

    if (!code) {
      setCodeError("请输入验证码");
      setIsSubmitting(false);
      return;
    } else if (!/^\d{6}$/.test(code)) {
      setCodeError("验证码格式错误");
      setIsSubmitting(false);
      return;
    } else {
      setCodeError(null);
    }

    const data = {
      mobile,
      code,
    };

    let timer = setTimeout(() => {
      clearTimeout(timer);
      console.log(data);
      alert(JSON.stringify(data));
      setIsSubmitting(false);
    }, 1000);
  }, [mobile]);

  // 获取验证码
  const handleGetCode = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validateMobileInput(mobile)) return;
    if (!mobileError) {
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      navigator.clipboard.writeText(randomCode).then(() => {
        alert(`验证码已复制: ${randomCode}`);
      });
    }
  }, [mobile, mobileError]);

  // 手机号校验函数
  const validateMobileInput = (m: string): boolean => {
    if (!m) {
      setMobileError("请输入手机号");
      return false
    } else if (!/^\d{11}$/.test(m)) {
      setMobileError("手机号格式错误");
      return false
    } else {
      setMobileError(null);
    }
    return true
  };

  // 手机号改变校验逻辑
  const inputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const m = e.target.value
    setMobile(m);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      validateMobileInput(m)
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    }, 300);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-item">
        <input 
          placeholder="手机号" 
          name="mobile" 
          value={mobile}
          onChange={inputChange}
          className={mobileError ? 'error' : ''}
        />
        {mobileError && <p className="form-error">{mobileError}</p>}
        {/* 表单错误提示，会出现两种情况
        1.必填校验，错误提示"请输入手机号"
        2.格式校验，需满足国内手机号规则，错误提示"手机号格式错误"
        举例：<p className="form-error">手机号格式错误</p> */}
      </div>

      <div className="form-item">
        <div className="input-group">
          <input placeholder="验证码" name="code" />
          {/* getcode默认disabled=true，当mobile满足表单验证条件后才位false */}
          <button 
            className={`getcode ${!!mobileError ? 'disabled' : ''}`} 
            disabled={!!mobileError} 
            onClick={handleGetCode}
          >
            获取验证码
          </button>
        </div>
        {codeError && <p className="form-error">{codeError}</p>}

        {/* 表单错误提示，会出现两种情况

        1.必填校验，错误提示"请输入验证码"
        2.格式校验，6位数字，错误提示"验证码格式错误"
        举例：<p className="form-error">验证码格式错误</p> */}
      </div>

      {/* 表单提交中，按钮内的文字会变成"submiting......" */}
      <button className="submit-btn">
        {isSubmitting ? "submitting......" : "登录"}
      </button>
    </form>
  );
}
