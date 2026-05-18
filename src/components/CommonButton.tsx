type CommonButtonProps = {
  children: string;
  onClick: () => void;
};

function CommonButton({ children, onClick }: CommonButtonProps) {
  return (
    <button type="button" className="back-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default CommonButton;
