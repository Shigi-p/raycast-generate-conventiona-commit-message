const prefixes = [
  { value: "add", title: "add", icon: "✨", iconText: "sparkles", description: "New Feature / 機能実装" },
  { value: "update", title: "update", icon: "👍", iconText: "+1", description: "Improve a feature / 機能改善" },
  { value: "fix", title: "fix", icon: "🐛", iconText: "bug", description: "Bugfix / バグ修正" },
  {
    value: "refactor",
    title: "refactor",
    icon: "♻️",
    iconText: "recycle",
    description: "Refactoring / リファクタリング",
  },
  {
    value: "document",
    title: "document",
    icon: "📝",
    iconText: "memo",
    description: "Documentation / ドキュメント作業",
  },
  { value: "style", title: "style", icon: "🎨", iconText: "art", description: "update style / スタイル調整" },
  { value: "remove", title: "remove", icon: "🔥", iconText: "fire", description: "Remove / 不要な機能・コードの削除" },
];

export default prefixes;
