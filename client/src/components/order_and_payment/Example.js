
import { useDispatch } from "react-redux";

import { resetCart } from "../../redux/actions/cartActions";

const Example = () => {
  const dispatch = useDispatch();
  const resetCartHandle = () => {
    dispatch(resetCart());
  };
  return (
    <div>
        <button onClick={resetCartHandle}></button>
    </div>
  )
}

export default Example
