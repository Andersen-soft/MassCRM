import * as React from 'react';
import cn from 'classnames';
import { Tabs as MaterialTabs, Tab } from '@material-ui/core';
import { TabPanel } from '../TabPanel';
import { HorizontalDivider } from '../HorizontalDivider';
import { Props } from './types';
import { useStyles } from './Tabs.styles';

export const Tabs: React.FC<Props> = props => {
  const classes = useStyles(props);
  const {
    children,
    defaultSelected,
    disabledTabs,
    tabsConfig,
    className,
    contentClassName,
    tabClassName,
    selected,
    onChange
  } = props;

  const {
    contentClasses,
    tabIndicatorProps,
    tabsClasses,
    tabClasses
  } = React.useMemo(
    () => ({
      contentClasses: cn(classes.contentContainer, contentClassName),
      tabsClasses: {
        root: className
      },
      tabClasses: {
        root: cn(classes.tab, tabClassName),
        wrapper: classes.text
      },
      tabIndicatorProps: {
        className: classes.indicator
      }
    }),
    [
      classes.contentContainer,
      classes.tab,
      classes.text,
      classes.indicator,
      contentClassName,
      className,
      tabClassName
    ]
  );

  const [selectedTab, changeSelectedTab] = React.useState(defaultSelected);
  const childrens = React.useMemo(() => React.Children.toArray(children), [
    children
  ]);

  const handleChangeTab = React.useCallback(
    (event: React.ChangeEvent<{}>, newValue: string) => {
      changeSelectedTab(newValue);

      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  return (
    <>
      <MaterialTabs
        value={selected || selectedTab}
        onChange={handleChangeTab}
        classes={tabsClasses}
        TabIndicatorProps={tabIndicatorProps}
        disableRipple
      >
        {tabsConfig.map(config => (
          <Tab
            key={config.key}
            classes={tabClasses}
            disabled={disabledTabs?.[config.key]}
            label={config.label}
            value={config.key}
          />
        ))}
      </MaterialTabs>
      <HorizontalDivider className={classes.divider} />
      <div className={contentClasses}>
        {childrens.map((child, index: number) => (
          <TabPanel
            key={tabsConfig[index]?.key}
            selected={selected || selectedTab}
            tabKey={tabsConfig[index]?.key}
          >
            {child}
          </TabPanel>
        ))}
      </div>
    </>
  );
};

Tabs.defaultProps = {
  defaultSelected: '',
  tabsConfig: []
};
