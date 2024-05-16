import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { activateButton, deactivateButton, updateState, handleInputChange } from '../../../utils/utils';
import api from '../../../utils/api';

import { HELPER_TEXT } from '../../../constants/helperText';

import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import Toast from '../../../components/Toast/Toast';
import Line from '../../../components/Line/Line';

import style from './Form.module.css';

const Form = () => {
    const navigate = useNavigate();

    const fileName = useRef();
    const preview = useRef();
    const fileInput = useRef();
    const uploadForm = useRef();
    const toastMessage = useRef();

    const [active, setActive] = useState('toast');

    // input
    const [post, setPost] = useState({
        image: '',
        title: '',
        content: '',
    });
    const [helperText, setHelperText] = useState({
        uploadHelper: '',
    });

    const isValid = post.image && post.title && post.content;

    useEffect(() => {
        if (isValid) {
            updateState('uploadHelper', '', setHelperText);
            return activateButton('upload-btn');
        }
        updateState('uploadHelper', HELPER_TEXT.UPLOAD_TEXT, setHelperText);
        deactivateButton('upload-btn');
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
            preview.current.src = '';
            preview.current.style.display = 'none';
            fileName.current.innerHTML = '파일을 선택해주세요.';
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
                const formData = new FormData(uploadForm.current);
                const response = await api.post('/posts', formData);
                console.log(response);
                if (response?.message === 'post created successfully') {
                    // TOAST 출력
                    setActive('toast-active');
                    setTimeout(function () {
                        setActive('toast');
                        return navigate('/posts');
                    }, 1000);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <form id='upload-form' ref={uploadForm} onSubmit={handleSubmit}>
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
                />
                <Line />
            </label>
            <div className='upload-helper helper-text'>{helperText.uploadHelper}</div>
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
                <Button id='upload-btn' text='완료' />
            </div>
            <Toast ref={toastMessage} active={active}>
                작성 완료
            </Toast>
        </form>
    );
};

export default Form;
