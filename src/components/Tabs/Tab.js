import React from 'react';
import { TabListItem, ActiveTabListItem } from './styles';

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
// class Tab extends Component {
//   static propTypes = {
//     activeTab: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//   };

//   render() {
//     const {
//       props: { activeTab, label, tabArrayLength },
//       onClick,
//     } = this;
//     //console.log(this.props);
//     const TabsContainer = activeTab === label ? ActiveTabListItem : TabListItem;

//     return (
//       <TabsContainer
//         width={`calc(100% / ${tabArrayLength})`}
//         label={label}

//       >
//         {label}
//       </TabsContainer>
//     );
//   }
// }

export default Tab;
