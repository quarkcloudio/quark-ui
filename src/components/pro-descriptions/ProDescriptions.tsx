import type { DescriptionsProps } from 'antd';

interface Props {
  actions?: any;
  data?: any;
  items?: any;
}

const ProDescriptions = (props: Props & DescriptionsProps) => {
  const { actions, bordered, colon, column, data, extra, items, layout, size, title } = props;

  return (
    <>
      <ADescriptions
        bordered={bordered}
        colon={colon}
        column={column}
        extra={extra}
        layout={layout}
        size={size}
        title={title}
      >
        {items?.map((item: any, index: number) => {
          return (
            <ADescriptions.Item
              key={index}
              label={item.label}
              span={item.span}
              style={item.style}
            >
              <Render
                body={{ body: item.value, component: item.component }}
                data={{ ...data }}
              />
            </ADescriptions.Item>
          );
        })}
      </ADescriptions>
      {actions?.length > 0 && (
        <>
          <ADivider style={{ marginTop: 0 }} />
          <div style={{ marginBottom: 16, textAlign: 'center' }}>
            <ASpace>
              {actions?.map((action: any, index: number) => {
                return (
                  <Action
                    {...action}
                    data={{ ...data }}
                    key={index}
                  />
                );
              })}
            </ASpace>
          </div>
        </>
      )}
    </>
  );
};

export default ProDescriptions;
