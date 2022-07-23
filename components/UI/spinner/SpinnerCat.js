import Image from "next/image";
import spinner from "../../../public/cat_spinner.gif";


const SpinnerCat = () => {
    return (
        <>
            <Image
                src={spinner}
                alt="Loading..."
                width={100}
                height={100}
            />
        </>
    );
};

export default SpinnerCat;