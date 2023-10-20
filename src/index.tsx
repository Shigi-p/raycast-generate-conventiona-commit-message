import { ActionPanel, Action, Clipboard, List } from "@raycast/api";
import prefixes from "./prefix";
import { useState } from "react";
import templateScope from "./scopes";

export default function Command() {
  const [selectedPrefix, setSelectedPrefix] = useState<null | string>(null);
  const [inputtedScope, setInputtedScope] = useState<null | string>(null);

  const generateCommitMessage = ({ prefix, scope }: { prefix: string; scope?: string | null }) => {
    if (!scope || scope?.trim() === "") return `${prefix}: `;
    return `${prefix}(${scope}): `;
  };

  return (
    <List
      isShowingDetail
      {...(selectedPrefix !== null && {
        searchBarPlaceholder: "Input scope",
        onSearchTextChange: (searchText) => {
          setInputtedScope(searchText);
        },
      })}
    >
      {selectedPrefix === null
        ? prefixes.map((_prefix, index) => (
            <List.Item
              key={index}
              title={_prefix.title}
              icon={_prefix.icon}
              detail={
                <List.Item.Detail
                  markdown={`commit message preview : \`${generateCommitMessage({ prefix: _prefix.value })}\``}
                />
              }
              actions={
                <ActionPanel>
                  <Action
                    title="Choose Prefix"
                    onAction={() => {
                      setSelectedPrefix(_prefix.value);
                    }}
                  />
                </ActionPanel>
              }
            />
          ))
        : templateScope.map((_scope, index) => (
            <List.Item
              key={index}
              title={_scope.project}
              detail={
                <List.Item.Detail
                  markdown={`commit message preview : \`${generateCommitMessage({
                    prefix: selectedPrefix,
                    scope: inputtedScope,
                  })}\``}
                />
              }
              actions={
                <ActionPanel>
                  <Action
                    // eslint-disable-next-line @raycast/prefer-title-case
                    title="Choose Scope from Project"
                    onAction={() => {
                      Clipboard.paste(generateCommitMessage({ prefix: selectedPrefix, scope: inputtedScope }));
                    }}
                  />
                </ActionPanel>
              }
            />
          ))}
    </List>
  );
}
