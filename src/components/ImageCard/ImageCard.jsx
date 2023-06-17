import { useState, useEffect } from "react";
import ModalView from 'components/Modal/Modal';
import { ImageItem, Image } from "./ImageCard.styled";
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import PropTypes from 'prop-types';





const ImageCard = ({webformatURL, tags, largeImageURL}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        return () => {
            clearAllBodyScrollLocks();
        };
    }, [isModalOpen])
    
    function modalOpen() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

        return (
                <ImageItem>
                    <Image src={webformatURL} alt={tags} onClick={modalOpen}></Image>
                    {isModalOpen && <ModalView 
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        largeImage={largeImageURL}
                        tags={tags}
                        />}
                </ImageItem>
        )
}

ImageCard.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};

export default ImageCard;