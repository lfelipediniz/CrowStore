import { useParams } from "react-router-dom";
import WrapProduct from "../components/WrapProduct/WrapProduct";

export default function Product() {
  const { productName } = useParams();

  return (
    <>
      <WrapProduct productName={productName} />
    </>
  );
}