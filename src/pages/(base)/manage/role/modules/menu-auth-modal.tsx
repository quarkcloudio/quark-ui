import { SimpleScrollbar } from '@sa/materials';

import {
  filterAndFlattenRoutes,
  flattenLeafRoutes,
  getBaseChildrenRoutes,
  getFlatBaseRoutes
} from '@/features/router/routes';
import { allRoutes } from '@/router';

import type { ModulesProps } from './type';

const flatRoutes = flattenLeafRoutes(getBaseChildrenRoutes(allRoutes));

const MenuAuthModal: FC<ModulesProps> = memo(({ onClose, open, roleId }) => {
  const { t } = useTranslation();

  const title = t('common.edit') + t('page.manage.role.menuAuth');

  const [home, setHome] = useState<string>();

  const [checks, setChecks] = useState<string[]>();

  const data = getFlatBaseRoutes(flatRoutes, t);

  const tree = filterAndFlattenRoutes(allRoutes[0].children || [], t);

  async function getChecks() {
    console.log(roleId);
    // request
    setChecks(['/home']);
  }

  function handleSubmit() {
    console.log(checks, roleId, home);
    // request

    window.$message?.success?.(t('common.modifySuccess'));

    onClose();
  }

  async function init() {
    setHome('/home');

    await getChecks();
  }

  useUpdateEffect(() => {
    if (open) {
      init();
    }
  }, [open]);

  return (
    <AModal
      className="w-480px"
      open={open}
      title={title}
      footer={
        <ASpace className="mt-16px">
          <AButton
            size="small"
            onClick={onClose}
          >
            {t('common.cancel')}
          </AButton>
          <AButton
            size="small"
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </AButton>
        </ASpace>
      }
      onCancel={onClose}
    >
      <div className="flex-y-center gap-16px pb-12px">
        <div>{t('page.manage.menu.home')}</div>

        <ASelect
          className="w-240px"
          options={data}
          value={home}
          onChange={setHome}
        />
      </div>

      <SimpleScrollbar className="!h-270px">
        <ATree
          multiple
          checkStrictly={false}
          selectedKeys={checks}
          treeData={tree}
          onSelect={value => setChecks(value as string[])}
        />
      </SimpleScrollbar>
    </AModal>
  );
});

export default MenuAuthModal;
