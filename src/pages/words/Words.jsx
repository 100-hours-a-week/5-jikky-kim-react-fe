import style from './Words.module.css';
import api from '../../utils/api';
import { useState, useEffect, useRef } from 'react';
import Info from '../../components/Info/Info';
import WordCard from '../../components/WordCard/WordCard';
import Search from './Search';

const Words = () => {
    const [keyword, setKeyword] = useState('');
    const [wordList, setWordList] = useState([]);
    const debounceTimeoutRef = useRef(null);

    const fetchWordList = async (params) => {
        try {
            const data = await api.get(`/words/search`, params);
            const words = data.words;
            setWordList(words);
            return words;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            fetchWordList({ keyword });
        }, 300);

        return () => {
            clearTimeout(debounceTimeoutRef.current);
        };
    }, [keyword]);

    return (
        <div id='words' className={style.words}>
            <div id='word-wrapper' className={style.word_wrapper}>
                <Info>
                    Dev Word 발음 검색
                    <br />
                    한국어 발음을 알고 싶은 단어를 찾아보세요!
                </Info>
                <Search keyword={keyword} setKeyword={setKeyword} />
                <div className='word_list'>
                    {wordList && wordList.map((word) => <WordCard key={word.word_id} {...word} />)}
                </div>
            </div>
        </div>
    );
};

export default Words;
