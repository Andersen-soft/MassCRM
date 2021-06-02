import React, {
  FC,
  useMemo,
  useCallback,
  useState,
  Children,
  ChangeEvent
} from 'react';
import cn from 'classnames';
import { Tabs as MaterialTabs, Tab } from '@material-ui/core';
import { HorizontalDivider } from 'src/view/atoms';
import { TabsConfig, DisabledTabs } from 'src/interfaces';
import { Panel } from './components';
import { useStyles } from './Tabs.styles';

interface IProps {
  defaultSelected: string | number;
  tabsConfig: TabsConfig;
  className?: string;
  contentClassName?: string;
  tabClassName?: string;
  disabledTabs?: DisabledTabs;
  selected?: string | number;
  onChange?: (selected: string | number) => void;
}

export const Tabs: FC<IProps> = props => {
  const styles = useStyles(props);

  const {
    children,
    defaultSelected = '',
    disabledTabs,
    tabsConfig = [],
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
  } = useMemo(
    () => ({
      contentClasses: cn(contentClassName),
      tabsClasses: {
        root: className
      },
      tabClasses: {
        root: cn(styles.tab, tabClassName),
        wrapper: styles.text
      },
      tabIndicatorProps: {
        className: styles.indicator
      }
    }),
    [
      styles.contentContainer,
      styles.tab,
      styles.text,
      styles.indicator,
      contentClassName,
      className,
      tabClassName
    ]
  );

  const [selectedTab, changeSelectedTab] = useState(defaultSelected);

  const memoizedChildren = useMemo(() => Children.toArray(children), [
    children
  ]);

  const handleChangeTab = useCallback(
    (_: ChangeEvent<{}>, newValue: string) => {
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
      >
        {tabsConfig.map(config => (
          <Tab
            data-testid={`tab_label_${config.label}`}
            key={config.key}
            classes={tabClasses}
            disabled={disabledTabs?.[config.key]}
            label={config.label}
            value={config.key}
            disableFocusRipple
          />
        ))}
      </MaterialTabs>
      <HorizontalDivider className={styles.divider} />
      <div className={contentClasses}>
        {memoizedChildren.map((child, index: number) => (
          <Panel
            key={tabsConfig[index]?.key}
            selected={selected || selectedTab}
            tabKey={tabsConfig[index]?.key}
          >
            {child}
          </Panel>
        ))}
      </div>
    </>
  );
};
