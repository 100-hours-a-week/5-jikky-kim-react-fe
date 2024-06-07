import React from 'react';
import Style from './Words.module.css';

function Search({ keyword, setKeyword }) {
    return (
        <form className={Style.form}>
            <input
                className={Style.search_input}
                type='text'
                placeholder='검색어를 입력해주세요.'
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
            />
        </form>
    );
}

export default Search;
