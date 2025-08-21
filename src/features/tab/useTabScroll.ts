import type BScroll from '@better-scroll/core';

export function useTabScroll(activeTabId: string) {
  const bsWrapper = useRef<HTMLDivElement>(null);

  const tabRef = useRef<HTMLDivElement>(null);

  const _bsWrapperSizeBounding = useRef<{ left: number; width: number }>({ left: 0, width: 0 });

  const _bsScrollRef = useRef<BScroll | null>(null);

  function _scrollByClientX(clientX: number) {
    const { left, width } = _bsWrapperSizeBounding.current;

    const currentX = clientX - left;

    const deltaX = currentX - width / 2;

    if (_bsScrollRef.current) {
      const { maxScrollX, scrollBy, x: leftX } = _bsScrollRef.current;

      const rightX = maxScrollX - leftX;
      const update = deltaX > 0 ? Math.max(-deltaX, rightX) : Math.min(-deltaX, -leftX);

      scrollBy(update, 0, 300);
    }
  }

  async function _scrollToActiveTab() {
    if (!tabRef.current) return;

    const { children } = tabRef.current;

    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];

      const tabId = child.id;

      if (tabId === activeTabId) {
        const { left, width } = child.getBoundingClientRect();

        const clientX = left + width / 2;

        setTimeout(() => {
          _scrollByClientX(clientX);
        }, 50);

        break;
      }
    }
  }

  function setBsScroll(bscroll: BScroll) {
    _bsScrollRef.current = bscroll;
  }

  useMount(() => {
    if (!bsWrapper.current) return;

    const { left, width } = bsWrapper.current.getBoundingClientRect();

    _bsWrapperSizeBounding.current = { left, width };

    Promise.resolve().then(() => {
      _scrollToActiveTab();
    });
  });

  useUpdateEffect(() => {
    _scrollToActiveTab();
  }, [activeTabId]);

  return {
    bsWrapper,
    setBsScroll,
    tabRef
  };
}
