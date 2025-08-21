import { useRoute } from '@/features/router';

const Component = () => {
  const { params } = useRoute<null, null, { slug: string[] }>();

  const { t } = useTranslation();

  return (
    <ACard
      className="h-full"
      title="Role Info"
    >
      <div className="mt-16px text-center text-18px">{t('page.manage.roleDetail.content')}</div>

      <div className="mt-16px text-center text-18px">{t('page.manage.roleDetail.explain')}</div>

      {params?.slug?.map((item, index) => (
        <div
          className="text-center text-18px"
          key={item}
        >
          第 {index + 1} 级: {item}
        </div>
      ))}
    </ACard>
  );
};

export default Component;
