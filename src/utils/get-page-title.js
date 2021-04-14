import defaultSettings from "@/settings";

// TODO: 页面标题的默认配置
const title = defaultSettings.title || "Vue Element Admin";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
