import type { ReactNode } from "react";
/*
ReactNode : 컴포넌트 사이에 데이터 타입이 아닌 이것저것 태그들이 
들어오려면 써야 하는 데이터 타입인데 이거는 타입스크립에서 제공하는게 아니고 
리액트에서 제공하는 타입이다
배지, 알림, 모달, 태그에서도 자주 쓴다
*/

type ButtonVariant = "primary" | "secondary" | "danger";
/*
primary   : 주요 버튼, 저장/확인
secondary : 보조 버튼, 취소/뒤로가기
danger    : 위험 버튼, 삭제
*/

type CommonButtonProps = {
  children: ReactNode;
  onClick?: () => void; // onClick? -> submit 버튼은 onClick 없이도 쓸 수 있으니까
  variant?: ButtonVariant; // ? -> variant 는 있어도 되고 없어도 된다
  type?: "button" | "submit";
  disabled?: boolean;
};

function CommonButton({
  children,
  onClick,
  variant = "secondary", // variant 를 따로 안넘기면 기본값은 secondary 이다
  type = "button",
  disabled = false,
}: CommonButtonProps) {
  return (
    <button
      type={type}
      className={`common-button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default CommonButton;
