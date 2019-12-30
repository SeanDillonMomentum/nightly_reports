import React, { useContext } from "react";
// import PropTypes from 'prop-types';
import Tab from "./Tab";
import { TabsContainer } from "./styles";
import { Context } from "../../App";

const Tabs = ({ children, width, nonCurved, flexTabContent, justify }) => {
  const { state, setState } = useContext(Context);
  const setActiveTab = e => setState(e);
  // console.log(state);

  // const [activeTab, setActiveTab] = useState(
  //   Array.isArray(children) ? children[0].props.label : children.props.label
  // );

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
// class Tabs extends Component {
//   static propTypes = {
//     children: PropTypes.instanceOf(Array).isRequired,
//   };

//   state = {
//     activeTab: this.props.children[0].props.label,
//   };

//   onClickTabItem = tab => {
//     // this.props.onClick(tab)
//     this.setState({ activeTab: tab });
//   };

//   render() {
//     // console.log(this.props);
//     const {
//       onClickTabItem,
//       props: { children, width, nonCurved, flexTabContent, justify },
//       state: { activeTab },
//     } = this;
//     // console.log(this.props);
//     return (
//       <TabsContainer
//         justified={justify}
//         width={width}
//         nonCurved={nonCurved}
//         flexTabContent={flexTabContent}
//       >
//         <ol>
//           {children.map(child => {
//             const { label } = child.props;

//             return (
//               <Tab
//                 reviewLevel={this.props.children}
//                 activeTab={activeTab}
//                 key={label}
//                 label={label}
//                 onClick={onClickTabItem}
//                 tabArrayLength={this.props.children.length}
//               />
//             );
//           })}
//         </ol>
//         <div className="tab-content">
//           {children.map(child => {
//             if (child.props.label !== activeTab) return undefined;
//             return child.props.children;
//           })}
//         </div>
//       </TabsContainer>
//     );
//   }
// }

export default Tabs;
