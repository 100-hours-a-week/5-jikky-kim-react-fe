import style from './Info.module.css';

function InfoText(props) {
    return <div className={style.post_info_text}>{props.children}</div>;
}
function Info(props) {
    return (
        <div className={style.post_info}>
            <InfoText>{props.children}</InfoText>
        </div>
    );
}

export default Info;
