import { ConvertScreen } from "@/src/features/convert/screens/ConvertScreen";
import { useLocalSearchParams } from "expo-router";

const Currency = () => {
  const { code } = useLocalSearchParams<{ code: string }>();

  return <ConvertScreen initialCode={code} />;
};

export default Currency;
