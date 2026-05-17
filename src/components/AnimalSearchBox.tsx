type AnimalSearchBoxProps = {
  keyword: string;
  onChangeKeyword: (value: string) => void;
};

function AnimalSearchBox({ keyword, onChangeKeyword }: AnimalSearchBoxProps) {
  return (
    <div className="search-box">
      <input
        type="text"
        value={keyword}
        onChange={(event) => onChangeKeyword(event.target.value)}
        placeholder="동물명, 종, 담당 사육사 검색"
      />
    </div>
  );
}

export default AnimalSearchBox;
