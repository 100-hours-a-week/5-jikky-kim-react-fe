import style from './Loading.module.css';

function Loading() {
    return (
        <>
            <div id='loading' className={style.loading}>
                <div className={style.spinner}></div>
            </div>
            <div id='loading'>
                <div className='spinner'></div>
            </div>
        </>
    );
}

export default Loading;
