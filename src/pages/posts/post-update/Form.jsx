import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { activateButton, deactivateButton, updateState, handleInputChange } from '../../../utils/utils';
import api from '../../../utils/api';

import { HELPER_TEXT } from '../../../constants/helperText';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Toast from '../../../components/Toast/Toast';
import Line from '../../../components/Line/Line';

import { IMAGE_SERVER_URL } from '../../../constants/res';

import style from './Form.module.css';

const Form = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fileName = useRef();
    const preview = useRef();
    const fileInput = useRef();
    const updateForm = useRef();
    const toastMessage = useRef();

    const [active, setActive] = useState('toast');

    // input
    const [post, setPost] = useState({
        image: '',
        title: '',
        content: '',
    });

    const [existImage, setExistImage] = useState({
        imageName: '',
        imageSrc: '',
    });

    const [helperText, setHelperText] = useState({
        updateHelper: '',
    });

    const isValid = post.title && post.content;

    const post_id = location.pathname.split('/')[2];

    const fetchPost = async () => {
        const response = await api.get(`/posts/${post_id}`);
        const { title, content, postImage } = response.post;
        setPost({
            title: title,
            content: content,
        });
        preview.current.src = IMAGE_SERVER_URL + postImage;
        let splitSrc = postImage.split('/');

        fileName.current.innerHTML = splitSrc[splitSrc.length - 1];
        setExistImage({
            imageName: splitSrc[splitSrc.length - 1],
            imageSrc: IMAGE_SERVER_URL + postImage,
        });
    };

    useEffect(() => {
        fetchPost();
    }, []);

    useEffect(() => {
        if (isValid) {
            updateState('updateHelper', '', setHelperText);
            return activateButton('update-btn');
        }
        updateState('updateHelper', HELPER_TEXT.UPLOAD_TEXT, setHelperText);
        deactivateButton('update-btn');
    }, [post, isValid]);

    const fileInputHandler = (event) => {
        const file = event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
            reader.onload = (event) => (preview.current.src = event.target.result);
            reader.readAsDataURL(file);

            fileName.current.innerHTML = file.name;
            preview.current.style.display = 'block';

            updateState('image', file.name, setPost);
        } else {
            preview.current.src = existImage.imageSrc;
            fileName.current.innerHTML = existImage.imageSrc;

            updateState('image', '', setPost);
        }
    };

    const clickPreview = () => {
        fileInput.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isValid) {
            try {
                const formData = new FormData(updateForm.current);
                const response = await api.patch(`/posts/${post_id}`, formData);
                console.log(response);
                if (response?.message === 'post updated successfully') {
                    // TOAST 출력
                    setActive('toast-active');
                    setTimeout(function () {
                        setActive('toast');
                        return navigate(`/posts/${post_id}`);
                    }, 1000);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <form id='update-form' ref={updateForm} onSubmit={handleSubmit}>
            <label htmlFor='title'>
                <div className={style.label_text}>제목*</div>
                <Line />
                <Input
                    className={style.title}
                    name='title'
                    type='text'
                    maxLength='26'
                    placeholder='제목을 입력해주세요. (최대 26글자)'
                    onChange={(event) => handleInputChange(event, setPost)}
                    value={post.title}
                />
                <Line />
            </label>
            <label htmlFor='content'>
                <div className={style.label_text}>내용*</div>
                <Line />
                <textarea
                    className={style.content}
                    name='content'
                    type='text'
                    placeholder='내용을 입력해주세요.'
                    onChange={(event) => handleInputChange(event, setPost)}
                    value={post.content}
                />
                <Line />
            </label>
            <div className='update-helper helper-text'>{helperText.updateHelper}</div>
            <label htmlFor='img' id='img-text' className={style.label_text}>
                이미지
            </label>
            <div className={style.img_label_wrap}>
                <label htmlFor='img' className={style.img_label}>
                    {' '}
                    파일 선택{' '}
                </label>
                <div id='file-name' ref={fileName}>
                    파일을 선택해주세요.
                </div>
            </div>

            <Input
                id='img'
                ref={fileInput}
                className={style.img}
                name='post_image'
                type='file'
                accept='image/*'
                onInput={fileInputHandler}
            />
            <div className={style.image_box}>
                <img id='preview' ref={preview} className={style.preview} alt='preview' onClick={clickPreview} />
            </div>
            <div className={style.btn_wrap}>
                <Button id='update-btn' text='수정하기' />
            </div>
            <Toast ref={toastMessage} active={active}>
                수정 완료
            </Toast>
        </form>
    );
};

export default Form;
