import { useDebounceFn, useKeyPress } from 'ahooks';
import type { InputRef } from 'antd';
import clsx from 'clsx';

import { useMixMenuContext } from '@/features/menu';
import { useRouter } from '@/features/router';
import { getIsMobile } from '@/layouts/appStore';

import SearchFooter from './SearchFooter';
import SearchResult from './SearchResult';

interface Props {
  onClose: () => void;
  show: boolean;
}

/**
 * Transform menu to searchMenus
 *
 * @param menus - menus
 * @param treeMap
 */
function transformMenuToSearchMenus(menus: App.Global.Menu[], treeMap: App.Global.Menu[] = []) {
  if (menus && menus.length === 0) return [];
  return menus.reduce((acc, cur) => {
    acc.push(cur);

    if (cur.children && cur.children.length > 0) {
      transformMenuToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}

const SearchModal = ({ onClose, show }: Props) => {
  const [resultOptions, setResultOptions] = useState<App.Global.Menu[]>([]);

  const [activeRoute, setActiveRoute] = useState<string>('');

  const isMobile = useAppSelector(getIsMobile);

  const { t } = useTranslation();

  const keyword = useRef<InputRef>(null);

  const { allMenus } = useMixMenuContext();

  const { navigate } = useRouter();

  const searchMenus = useMemo(() => transformMenuToSearchMenus(allMenus), [allMenus]);

  function handleClose() {
    // handle with setTimeout to prevent user from seeing some operations
    setTimeout(() => {
      onClose();
      setResultOptions([]);
    }, 200);
  }

  function search() {
    const result = searchMenus.filter(menu => {
      const trimKeyword = keyword.current?.input?.value?.toLocaleLowerCase().trim();
      return trimKeyword && menu.title?.includes(trimKeyword);
    });

    const activeName = result[0]?.key || '';

    setResultOptions(result);
    setActiveRoute(activeName);
  }

  const handleSearch = useDebounceFn(search, { wait: 300 });

  /** key up */
  function handleUp() {
    handleKeyPress(-1); // 方向 -1 表示向上
  }

  /** key down */
  function handleDown() {
    handleKeyPress(1); // 方向 1 表示向下
  }

  function getActivePathIndex() {
    return resultOptions.findIndex(item => item.key === activeRoute);
  }

  function handleKeyPress(direction: 1 | -1) {
    const { length } = resultOptions;
    if (length === 0) return;

    const index = getActivePathIndex();
    if (index === -1) return;

    const activeIndex = (index + direction + length) % length; // 确保 index 在范围内循环
    const activeKey = resultOptions[activeIndex].key;

    setActiveRoute(activeKey);
  }

  /** key enter */
  function handleEnter() {
    if (resultOptions.length === 0 || activeRoute === '') return;
    handleClose();
    navigate(activeRoute);
  }

  useKeyPress('Escape', handleClose);
  useKeyPress('Enter', handleEnter);
  useKeyPress('uparrow', handleUp);
  useKeyPress('downarrow', handleDown);

  return (
    <AModal
      destroyOnClose
      className={clsx({ 'top-0px rounded-0': isMobile })}
      closable={false}
      footer={isMobile ? null : <SearchFooter />}
      height={isMobile ? '100%' : 400}
      open={show}
      style={isMobile ? { margin: 0, maxWidth: '100%', padding: 0 } : undefined}
      styles={{ content: { height: isMobile ? '100vh' : '100%', paddingBottom: 0 } }}
      width={isMobile ? '100%' : 630}
      onCancel={handleClose}
    >
      <ASpace.Compact className="w-full">
        <AInput
          allowClear
          placeholder={t('common.keywordSearch')}
          prefix={<IconUilSearch className="text-15px text-#c2c2c2" />}
          ref={keyword}
          onInput={handleSearch.run}
        />
        {isMobile && (
          <AButton
            ghost
            type="primary"
            onClick={handleClose}
          >
            {t('common.cancel')}
          </AButton>
        )}
      </ASpace.Compact>

      <div className="mt-20px">
        {resultOptions.length === 0 ? (
          <AEmpty />
        ) : (
          resultOptions.map(item => (
            <SearchResult
              active={item.key === activeRoute}
              enter={handleEnter}
              key={item.key}
              menu={item}
              setActiveRouteName={setActiveRoute}
            />
          ))
        )}
      </div>
    </AModal>
  );
};

export default SearchModal;
