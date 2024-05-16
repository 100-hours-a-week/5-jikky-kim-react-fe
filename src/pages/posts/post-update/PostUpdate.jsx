import style from './PostUpdate.module.css';
import Form from './Form';

function PostUpdate() {
    return (
        <div className={style.section}>
            <div id='upload' className={style.upload}>
                <div className={style.page_title}>게시글 수정</div>
                <Form />
            </div>
        </div>
    );
}

export default PostUpdate;
