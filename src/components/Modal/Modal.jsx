import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1200,
    },
    content: {
        backgroundColor: 'transparent',
        maxWidth: 'calc(100vw - 48px)',
        maxHeight: 'calc(100vh - 24px)',
        padding: 0,
        border: 'none',
        position: 'static',
        borderRadius: 0,
        overflow: 'hidden',
    },
};

ReactModal.setAppElement('#root');

export const ModalView = ({ isOpen, largeImage, tags, onClose}) => {
    return (
        <ReactModal
            closeTimeoutMS={300}
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={onClose}
            onAfterOpen={() => disableBodyScroll(document)}
            onAfterClose={() => enableBodyScroll(document)}
        >
            <img src={largeImage} alt={tags} />
        </ReactModal>
    );
};

ModalView.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ModalView;