import { Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

export const GoBack = () => {
    let navigate = useNavigate();
    return (
        <>
        <Button onClick={() => navigate(-1)} className='btn-space btn-primary btn-sm'> <span className="bi bi-arrow-left-circle"></span></Button>
        {/*<i onClick={() => navigate(-1)} className="bi bi-arrow-left-circle goback btn-primary"></i>*/}
        </>
    );
};