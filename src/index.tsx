import { ActionPanel, Action, Clipboard, List } from "@raycast/api";
import prefixes from "./prefix";
import { useState } from "react";
import templateScope from "./scopes";

export default function Command() {
  const [selectedPrefix, setSelectedPrefix] = useState<null | string>(null);
  const [inputtedScope, setInputtedScope] = useState<null | string>(null);

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
                  markdown={`
commit message preview  
\`${_prefix.value}:\``}
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
                  markdown={`
commit message preview  
\`${selectedPrefix}${inputtedScope ? ` (${inputtedScope})` : ""}:\``}
                />
              }
              actions={
                <ActionPanel>
                  <Action
                    // eslint-disable-next-line @raycast/prefer-title-case
                    title="Choose Scope from Project"
                    onAction={() => {
                      if (inputtedScope === null || inputtedScope.trim() === "") {
                        Clipboard.paste(`${selectedPrefix}: `);
                      } else {
                        Clipboard.paste(`${selectedPrefix}${inputtedScope ? ` (${inputtedScope}) ` : " "}:`);
                      }
                    }}
                  />
                </ActionPanel>
              }
            />
          ))}
    </List>
  );
}
