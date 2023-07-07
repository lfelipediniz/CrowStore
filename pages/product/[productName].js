import { useRouter } from "next/router";
import WrapProduct from "../../components/WrapProduct/WrapProduct";

export default function Product() {
  const router = useRouter();
  const { productName } = router.query;

  return <WrapProduct productName={productName} />;
}
