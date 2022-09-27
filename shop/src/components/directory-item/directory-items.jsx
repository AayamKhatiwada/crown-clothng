import { useNavigate } from 'react-router-dom';
import './directory-item.scss';

const DirectoryItem = ({ category }) => {
    const { title, imageUrl, route } = category
    const navigate = useNavigate();

    const changeRoute = () => navigate(route)

    return (
        <div className="directory-item-container" onClick={changeRoute}>
            <div className='background-image' style={{ backgroundImage: `url(${imageUrl})` }} />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop now</p>
            </div>
        </div>
    );
}

export default DirectoryItem;