import style from './PostCreate.module.css';
import Form from './Form';

function PostCreate() {
    return (
        <div className={style.section}>
            <div id='upload' className={style.upload}>
                <div className={style.page_title}>게시글 작성</div>
                <Form />
            </div>
        </div>
    );
}

export default PostCreate;
