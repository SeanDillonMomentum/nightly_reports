import React from "react";
import { TabListItem, ActiveTabListItem } from "./styles";

const Tab = ({ activeTab, label, tabArrayLength = 1, onClick }) => {
  const TabsContainer = activeTab === label ? ActiveTabListItem : TabListItem;

  return (
    <TabsContainer
      onClick={() => onClick(label)}
      width={`calc(100% / ${tabArrayLength})`}
      label={label}
    >
      {label}
    </TabsContainer>
  );
};

export default Tab;
