import React, { useContext } from "react";
// import PropTypes from 'prop-types';
import Tab from "./Tab";
import { TabsContainer } from "./styles";
import { Context } from "../../App";

const Tabs = ({ children, width, nonCurved, flexTabContent, justify }) => {
  const { state, setState } = useContext(Context);
  const setActiveTab = e => setState(e);

  return (
    <TabsContainer
      justified={justify}
      width={width}
      nonCurved={nonCurved}
      flexTabContent={flexTabContent}
    >
      <ol>
        {!Array.isArray(children) ? (
          <Tab
            reviewLevel={children}
            activeTab={state}
            key={children.props.label}
            label={children.props.label}
            onClick={setActiveTab}
            tabArrayLength={children.length}
          />
        ) : (
          children.map(child => {
            const { label } = child.props;

            return (
              <Tab
                reviewLevel={children}
                activeTab={state}
                key={label}
                label={label}
                onClick={setActiveTab}
                tabArrayLength={children.length}
              />
            );
          })
        )}
      </ol>
      <div className="tab-content">
        {!Array.isArray(children)
          ? children.props.children
          : children.map(child => {
              if (child.props.label !== state) return undefined;
              return child.props.children;
            })}
      </div>
    </TabsContainer>
  );
};

export default Tabs;
