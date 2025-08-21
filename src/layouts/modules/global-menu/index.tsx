import HorizontalMenu from './modules/Horizontal';
import HorizontalMix from './modules/HorizontalMix';
import ReversedHorizontalMix from './modules/ReversedHorizontalMix';
import VerticalMenu from './modules/Vertical';
import VerticalMixMenu from './modules/VerticalMix';

interface Props {
  mode: UnionKey.ThemeLayoutMode;
  reverse: boolean;
}

const GlobalMenu = memo(({ mode, reverse }: Props) => {
  if (mode === 'horizontal') return <HorizontalMenu />;

  if (mode === 'horizontal-mix') return reverse ? <ReversedHorizontalMix /> : <HorizontalMix />;

  if (mode === 'vertical') return <VerticalMenu />;

  return <VerticalMixMenu />;
});

export default GlobalMenu;
