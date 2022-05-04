import { ChangeEventHandler } from "react";
import "./search-box.styles.css";

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
};

const SearchBox = ({
  placeholder,
  className,
  onChangeHandler,
}: SearchBoxProps) => {
  return (
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={(e) => onChangeHandler(e)}
    />
  );
};

export default SearchBox;
