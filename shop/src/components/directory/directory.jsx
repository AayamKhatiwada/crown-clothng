import DirectoryItem from '../directory-item/directory-items';
import './directory.scss'

const Directory = ({ directory }) => {
    return (
        <div className="directory-container">
            {directory.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
        </div>
    );
}

export default Directory;