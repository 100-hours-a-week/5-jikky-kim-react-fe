import style from './Info.module.css';

function InfoText(props) {
    return <div className={style.post_info_text}>{props.children}</div>;
}
function Info() {
    return (
        <div className={style.post_info}>
            <InfoText>안녕하세요,</InfoText>
            <InfoText>
                아무 말 대잔치 <strong>게시판</strong> 입니다.
            </InfoText>
        </div>
    );
}

export default Info;
