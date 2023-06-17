import { ButtonMore } from "./LoadMore.styled";
import PropTypes from 'prop-types';

export const LoadMore = ({onClick})=> {
    return (
        <ButtonMore type="button" onClick={onClick}>Load More</ButtonMore>
    )
}


LoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default LoadMore;


