import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/StarOutlined';

const FavoriteButton = ({ isFavorite, handleToggleFavorite }) => (
  <IconButton onClick={handleToggleFavorite}>
    {isFavorite ? <StarIcon /> : <StarBorderIcon />}
  </IconButton>
);

export default FavoriteButton;
