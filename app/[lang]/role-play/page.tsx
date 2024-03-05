import RolePlayContainer from "@/components/role-play/RolePlayContainer";
import { getDictionary } from "@/dictionary";
import { Locale } from "@/i18n.config";

const RolePlayPage = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dict = await getDictionary(lang);
  return <RolePlayContainer dict={dict} />;
};

export default RolePlayPage;
