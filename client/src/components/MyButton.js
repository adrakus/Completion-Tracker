import Button from '@mui/material/Button';

export default function MyButton({children, variant, ...props}){
    return(
        <Button variant={variant??"contained"} {...props}>{children}</Button>
    );
};
