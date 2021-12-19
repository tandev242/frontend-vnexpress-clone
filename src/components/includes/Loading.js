import Loader from "react-loader-spinner";

export const Loading = () => {
    return (
        <div className="container">
            <div className="row text-center">
                <Loader type="Bars" color="#00BFFF" height={380} width={40} />
            </div>
        </div>
    );
};
