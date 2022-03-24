import { Link } from 'react-router-dom';

export default function MyLink({children, style, ...props}){
    return(
        <Link style={{textDecoration: "none", ...style}} {...props}>{children}</Link>
    );
};
