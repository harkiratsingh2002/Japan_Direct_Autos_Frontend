import { useSelector } from "react-redux";

const Loading = (props)=>{
    const showLoader = useSelector((state) => state.loadingSlice.showLoader);

    return (
        <div style={{
            display: showLoader?'block':'none'
        }} id="myOverlay">
            
            <div style={{
                margin: 'auto',
            }} className="loader"></div>
        </div>
    )
}

export default Loading;